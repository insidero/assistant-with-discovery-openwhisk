import React from 'react';
import './Message.css';

function openInNewTab(url) {
  var win =  window.open(url, '_blank');
  //  var win =
   win.focus();
}
function Message(props) {
  console.log("MESAGE PROPS: ", props)

  var indexLinkStart = props.message.indexOf('<a');
  var indexLinkEnd = props.message.indexOf('a>');
  var myMessageA = indexLinkStart!== -1 ? props.message.slice(0, indexLinkStart) : props.message;
  console.log(myMessageA);
  var myMessageB = indexLinkStart!== -1 ? props.message.slice(indexLinkEnd+2, props.message.length) : props.message;
  // console.log(myMessageB);
  var myLink = props.message.slice(indexLinkStart, indexLinkEnd-2 );
  console.log(myLink);
  var myMessage= indexLinkStart!== -1 ? myMessageA+myMessageB: myMessageA;

if(props.link && props.isLast){
  // props.link='';
  var urlStartIndex = props.message.indexOf('href="');
  var urlEndIndex = props.message.indexOf('" target');
  var myURL = props.message.slice(urlStartIndex+6, urlEndIndex);
  console.log('url ', myURL, indexLinkStart);
  // openInNewTab(myURL);
  myURL = '';
  console.log('url ', myURL, indexLinkStart);
 }

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

   { props.link?( <div dangerouslySetInnerHTML={{__html: myLink}}/>):false}
      {/* {props.indexLinkStart? openInNewTab('https://graana.com'): false} */}

      {props.date ? <div className="message__date">{props.date}</div> : false}
    </div>
  );
}

export default Message;
