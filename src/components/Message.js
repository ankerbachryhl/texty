import React, { Component } from 'react'

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.message.content && (
          <div>
            <p>{this.props.message.content} - by: {this.props.message.sendBy.name}</p>
            <p>Send at {this.props.message.createdAt}</p>
          </div>
        )}

        {this.props.message.media && (
          <div>
            <img src={this.props.message.media} />
            <p>by: {this.props.message.sendBy.name}</p>
            <p>Send at {this.props.message.createdAt}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Message
