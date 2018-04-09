import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import onError from '../utils';

import { CHATS_QUERY } from './Chats';

const CREATE_CHAT_MUTATION = gql`
  mutation createChat($name: String!) {
    createChat(name: $name) {
      name
      id
      createdAt
      likes {
        id
      }
      messages(last: 3) {
        id
        content
      }
    }
  }
`

class CreateChat extends Component {
  state = { chatName: '' };

  returnDateInString() {
    const date = new Date()
    return (
      JSON.stringify(date)
    )
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={CREATE_CHAT_MUTATION}
          optimisticResponse={{
            __typename: "Mutation",
            createChat: {
              __typename: "Chat",
              name: this.state.chatName,
              id: null,
              createdAt: this.returnDateInString(),
              likes: [],
              messages: null,
            }
          }}
          update={(cache, { data: { createChat } }) => {
            const { chats } = cache.readQuery({ query: CHATS_QUERY })
            cache.writeQuery({
              query: CHATS_QUERY,
              data: { chats: chats.concat([createChat])}
            })
          }}
        >
          {(createChat, { loading, error }) => {
            if (loading) return <p>Creating chat</p>
            if (error) return <p>{onError(error)}</p>
            return (
              <div>
                <input
                  value={this.state.chatName}
                  onChange={e => this.setState({ chatName: e.target.value })}
                  placeholder="Chat Name"
                />
                <button onClick={() => {
                    createChat({ variables: { name: this.state.chatName }})
                    this.setState({ chatName: '' })
                  }}
                >
                  Make chat
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

export default CreateChat
