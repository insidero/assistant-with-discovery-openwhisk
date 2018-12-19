import React from 'react';
import './Message.css';

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function Message(props) {

  const indexLinkStart = props.message.indexOf('<a');
  const indexLinkEnd = props.message.indexOf('a>');
  const myMessageA = indexLinkStart!== -1 ? props.message.slice(0, indexLinkStart) : props.message;
  console.log(myMessageA);
  const myMessageB = indexLinkStart!== -1 ? props.message.slice(indexLinkEnd+2, props.message.length) : props.message;
  console.log(myMessageB);
  const myLink = props.message.slice(indexLinkStart, indexLinkEnd-2 );
  console.log(myLink);
  const myMessage= indexLinkStart!== -1 ? myMessageA+myMessageB: myMessageA;
  
  return (
    <div className={props.position === 'right' ? 'message message--from-right' : 'message message--from-left'}>
      {props.label ? <div className="message__label">{props.label}</div>: false}
      <div className="message__content">{myMessage } </div>
     
      {props.hasTail ? (
        <div className="message__tail">
          <div className="message__tail-background"></div>
          <div className="message__tail-foreground"></div>
        </div>
      ) : false}
     <div dangerouslySetInnerHTML={{__html: myLink}}/>
      {/* {props.indexLinkStart? openInNewTab('https://graana.com'): false} */}

      {props.date ? <div className="message__date">{props.date}</div> : false}
    </div>
  );
}

export default Message;
