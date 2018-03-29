import React, { Component } from 'react'

class Message extends Component {
  render() {
    return (
      <div>
        <p>{this.props.message.content} - by: {this.props.message.sendBy.name}</p>
        <p>Send at {this.props.message.createdAt}</p>
      </div>
    )
  }
}

export default Message
