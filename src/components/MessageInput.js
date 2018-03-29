import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { CHAT_QUERY } from './ChatRoom';

class MessageInput extends Component {
  state = { messageContent: '' };

  sendMessage = async () => {
    const { messageContent } = this.state
    await this.props.createMessageMutation({
      variables: {
        content: messageContent
      },
    })

    //Clear input
    this.setState({ messageContent: '' })
  }

  render() {
    return (
      <div>
        <input
          value={this.state.messageContent}
          onChange={e => this.setState({ messageContent: e.target.value })}
          placeholder="Write message here"
        />
        <button
          onClick={this.sendMessage}
        >
          Send message
        </button>
      </div>
    )
  }
}

const MESSAGE_MUTATION = gql`
  mutation CreateMessageMutation($content: String!) {
    createMessage(content: $content) {
      content
      createdAt
      id
      sendBy {
        name
      }
    }
  }
`

export default graphql(MESSAGE_MUTATION, { name: 'createMessageMutation' })(MessageInput)
