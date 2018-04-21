import React, { Component } from 'react'

const Message = ({message}) => {
  return (
    <div className="message is-primary">
      <div className="message-body">
        <p className="is-size-5">{message.content}</p>
          {message.media && (
            <img src={message.media} />
          )}
        <p className="is-size-8 has-text-success">Send at {message.createdAt} - by: {message.sendBy.name}</p>
      </div>


    </div>
  )
}

export default Message
