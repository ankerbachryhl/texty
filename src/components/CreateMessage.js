import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($content: String!, $media: String!, $chatId: String!) {
    createMessage(content: $content, media: $media, chatId: $chatId) {
      content
      createdAt
      id
      sendBy {
        name
      }
    }
  }
`

class CreateMessage extends Component {
  state = { messageContent: '', error: '' };

  onError(error) {
    const errorMessage = error.message.replace('GraphQL error:', '')

    return (
      <p>{errorMessage}</p>
    )
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={CREATE_MESSAGE_MUTATION}
        >
          {(createMessage, { loading, error }) => {
            if (loading) return <p>Sending message!</p>


            return (
              <div>
                <input
                  value={this.state.messageContent}
                  onChange={e => this.setState({ messageContent: e.target.value })}
                  placeholder="Write message here"
                />
                <button onClick={() => {
                    createMessage({ variables: { content: this.state.messageContent, media: '', chatId: this.props.chatId }})
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
