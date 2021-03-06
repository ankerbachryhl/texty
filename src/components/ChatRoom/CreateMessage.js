import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import onError from '../../utils';

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($content: String!, $chatId: String!) {
    createMessage(content: $content, chatId: $chatId) {
      content
      createdAt
      id
      sendBy {
        name
        id
      }
    }
  }
`

class CreateMessage extends Component {
  state = { messageContent: '' };

  render() {
    return (
      <div>
        <Mutation
          mutation={CREATE_MESSAGE_MUTATION}
        >
          {(createMessage, { loading, error }) => {
            if (loading) return <p>Sending message!</p>
            if (error) return <p>{onError(error)}</p>

            return (
              <div>
                <input
                  value={this.state.messageContent}
                  onChange={e => this.setState({ messageContent: e.target.value })}
                  placeholder="Write message here"
                />
                <button onClick={() => {
                    createMessage({ variables: { content: this.state.messageContent, chatId: this.props.chatId }})
                    this.setState({ messageContent: '' })
                  }}
                >
                  Send message
                </button>
              </div>
              )
            }
          }
        </Mutation>
      </div>
    )
  }
}



export default CreateMessage
