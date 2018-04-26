import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import onError from '../utils';

const CREATE_CHAT_MUTATION = gql`
  mutation createChat($name: String!) {
    createChat(name: $name) {
      name
      id
      createdAt
      likeCount
      likes {
        id
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
              likeCount: 0,
              likes: [],
            }
          }}
          update={(cache, { data: { createChat } }) => {
            const { chats } = cache.readQuery({ query: this.props.query })
            cache.writeQuery({
              query: this.props.query,
              data: { chats: [createChat, ...chats] }
            })
          }}
        >
          {(createChat, { loading, error }) => {
            if (error) return <p>{onError(error)}</p>
            return (
              <div className="level">
                <input
                  value={this.state.chatName}
                  onChange={e => this.setState({ chatName: e.target.value })}
                  placeholder="Chat Name"
                  className="input is-success is-outlined is-medium"
                />
                <button onClick={() => {
                    createChat({ variables: { name: this.state.chatName }})
                    this.setState({ chatName: '' })
                  }}
                  className="button is-outlined is-primary is-medium"
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
