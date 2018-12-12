import React from 'react';
import './Conversation.css';
import { InputWithButton } from 'watson-react-components';
import Message from './Message.js';

import { FloatingActionButton, MuiThemeProvider } from 'material-ui';
import MicrophoneOn from 'material-ui/svg-icons/av/mic';
import MicrophoneOff from 'material-ui/svg-icons/av/stop';
import { ReactMic } from 'react-mic';


function Conversation(props) {

  function makeMessage(msgObj, index) {

    if (typeof msgObj.message === 'string') {
      return (
        <Message key={index} position={msgObj.position || false} label={msgObj.label || false} date={msgObj.date || false} message={msgObj.message} hasTail={msgObj.hasTail || false}/>
      );
    } else if ( React.isValidElement(msgObj.message)) {
      return ( msgObj.message );
    } else {
      return false;
    }
  }

  return (
    <div className="conversation">
      <div className="conversation__messages">
        <div>
          {props.messageObjectList.map(makeMessage)}
        </div>
      </div>
      <div className="conversation__input-container">
        <InputWithButton className="conversation__input" onSubmit={props.onSubmit} placeholder="Say something to Watson."/>
        <MuiThemeProvider>
        <div>
        
          <ReactMic
            className="oscilloscope"
            record={props.isRecording}
            audioBitsPerSecond= {128000}
            onStop={props.onStop}
            onStart={props.onStart}
            onSave={props.onSave}
      />
         
         
          <br />
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={props.isRecording}
            onClick={props.startRecording}>
            <MicrophoneOn />
          </FloatingActionButton>
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={!props.isRecording}
            onClick={props.stopRecording}>
            <MicrophoneOff />
          </FloatingActionButton>
          </div>
    </MuiThemeProvider>
   
  </div>
      </div>
     

  );
}

export default Conversation;
