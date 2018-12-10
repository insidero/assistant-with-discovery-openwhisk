import React from 'react';
import './Conversation.css';
import { InputWithButton } from 'watson-react-components';
import Message from './Message.js';
import AudioRecorder from 'react-audio-recorder';
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
        <button 
        onMouseDown={props.startRecording}
        onMouseUp={props.stopRecording
         }>hi</button>

         <AudioRecorder 
         downloadable: true
         filename: 'audio.wav'
         onChange={props.onChange}
         />
      </div>
      <div className="conversation__disclaimer--message">
        
      </div>
    </div>
  );
}

export default Conversation;
