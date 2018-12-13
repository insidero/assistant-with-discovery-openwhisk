import React, { Component } from 'react';
import './App.css';
import Conversation from './Conversation.js';
import DiscoveryResult from './DiscoveryResult.js';
import { ReactMic } from 'react-mic';
import axios from 'axios';

// import Recorder from 'react-recorder2';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      context: {},
      // A Message Object consists of a message[, intent, date, isUser]
      messageObjectList: [],
      discoveryNumber: 0,
      isRecording: false,
      blobObject: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.callWatson('hello');
  }

  startRecording= () => {

    this.setState({
      isRecording: true
    });
  }

  stopRecording= () => {
    this.setState({
      isRecording: false
    });
  }

  onSave=(blobObject) => {
  }

  onStart=() => {
    console.log('You can tap into the onStart callback');
  }

  onStop= (blobObject) => {
    this.setState({
      blobURL : blobObject.blobURL
    });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', blobObject.blobURL, true);
    xhr.responseType = 'blob';
    console.log(blobObject.blobURL);
    var parentThis=this;
    xhr.onload = function(e) {
      if (this.status == 200) {
        var myBlob = this.response;
        // myBlob is now the blob that the object URL pointed to.
        console.log(myBlob);
        let formData = new FormData(); 
        formData.append('audioFile', myBlob);
        
        
        axios.post('http://localhost:5000/speechtotext', formData
        ).then(function(response){
          console.log('response from STT--  ',response.data);
          
          parentThis.handleSubmit(''+response.data);
        }).catch(function(error){
          console.log(error);
        })

      }
    };
    xhr.send();


  }

  onData(recordedBlob){
    console.log('chunk of real-time data is: ', recordedBlob);
  }
  callWatson(message) {
    console.log("calling watsons");
    const watsonApiUrl = process.env.REACT_APP_API_URL;
    const requestJson = JSON.stringify({
      input: {
        text: message
      },
      context: this.state.context
    });
    return fetch(watsonApiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: requestJson
      }
    ).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return (response.json());
    })
      .then((responseJson) => {
        responseJson.date = new Date();
        this.handleResponse(responseJson);
      }).catch(function(error) {
        throw error;
      });
  }

  handleResponse(responseJson) {
    if (responseJson.hasOwnProperty('output') && responseJson.output.hasOwnProperty('action') && responseJson.output.action.hasOwnProperty('call_discovery')) {
      this.addMessage( { label: 'Discovery Result:', message: 'Great question. Here\'s what I found:', date: (new Date()).toLocaleTimeString()});
      this.formatDiscovery(responseJson.output.discoveryResults);

    } else {
      const outputMessage = responseJson.output.text.filter(text => text).join('\n');
      const outputIntent = responseJson.intents[0] ? responseJson.intents[0]['intent'] : '';
      const outputDate = responseJson.date.toLocaleTimeString();
      const outputContext = responseJson.context;
      this.setState({
        context: outputContext
      });
      const msgObj = {
        position: 'left',
        label: outputIntent,
        message: outputMessage,
        date: outputDate,
        hasTail: true
      };
      this.addMessage(msgObj);
    }
  }

  addMessage(msgObj) {
    this.setState({
      messageObjectList: [ ...this.state.messageObjectList , msgObj]
    });
  }

  handleSubmit(e) {
    var inputMessage='';
    if (typeof e ==='string')


    
    {
      console.log(e);
      // e.target.value=e;
       inputMessage=e;
    }else{
     inputMessage =e.target.value;
    }
   
    const inputDate = new Date();
    const formattedDate = inputDate.toLocaleTimeString();
    const msgObj = {
      position: 'right',
      message: inputMessage,
      date: formattedDate,
      hasTail: true
    };
    this.addMessage(msgObj);
    // e.target.value= '';
    if (typeof e ==='string')
    {
      e='';
      // e.target.value=e;
     
    }else{
      e.target.value='';
    }
    this.callWatson(inputMessage);
  }

  formatDiscovery(resultArr) {
    resultArr.map(function(result, index) {
      const formattedResult = <DiscoveryResult key={'d' + this.state.discoveryNumber + index} title={result.title} preview={result.bodySnippet} link={result.sourceUrl} linkText={'See full manual entry'} />;
      this.addMessage({ message: formattedResult });
    }.bind(this));

    this.setState({
      discoveryNumber: this.state.discoveryNumber + 1
    });
    return (true);
  }

  scrollToBottom() {
    const element = document.getElementsByClassName('conversation__messages')[0];
    element.scrollTop = element.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }





  
 render() {
   console.log('STATE',this.state);
    return (
      <div className="app-wrapper">
        
        <Conversation
          onSubmit={this.handleSubmit}
          messageObjectList={this.state.messageObjectList}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
        //  onStop={this.onStop}
         onStop={this.onStop}
         onStart={this.onStart}
         onSave={this.onSave}
         onData={this.onData}

        isRecording={this.state.isRecording}
        />
      </div>
    );
  }
}

export default App;
