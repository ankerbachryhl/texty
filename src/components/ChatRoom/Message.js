import React, { Component } from 'react'

const Message = ({message}) => {
  return (
    <div>
      <div>
        <p>{message.content}</p>
          {message.media && (
            <img src={message.media} />
          )}
        <p>Send at {message.createdAt} - by: {message.sendBy.name}</p>
      </div>


    </div>
  )
}

export default Message
