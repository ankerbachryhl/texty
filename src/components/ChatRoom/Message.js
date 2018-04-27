import React, { Component } from 'react'
import { LOGGED_IN_USER } from '../../constants'

const loggedInUserID = localStorage.getItem(LOGGED_IN_USER)

const Message = ({message}) => {
  console.log(loggedInUserID)
  if (loggedInUserID === message.sendBy.id) {
    return (
      <div className="message is-success">
        <div className="message-body">
          <p className="is-size-5">{message.content}</p>
            {message.media && (
              <img src={message.media} />
            )}
          <p className="is-size-8 has-text-primary">Send at {message.createdAt} - by: {message.sendBy.name}</p>
        </div>
      </div>
    )
  }
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
