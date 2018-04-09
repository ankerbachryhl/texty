import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import onError from '../utils';

import { CHATS_QUERY } from './Chats';

const LIKE_CHAT = gql`
  mutation likeChat($chatId: String!) {
    likeChat(chatId: $chatId) {
      id
    }
  }
`

class LikeChat extends Component {
  render() {
    return (
      <div>
        <Mutation
          mutation={LIKE_CHAT}
          update={(cache, { data: { likeChat } }) => {
            const { chats } = cache.readQuery({ query: CHATS_QUERY })
            const likedChat = chats.findIndex(chat => chat.id == this.props.chatId)

            chats[likedChat].likes.push(likeChat)

            cache.writeQuery({
              query: CHATS_QUERY,
              data: {
                chats: chats,
              }
            })
          }}
        >
          {(likeChat, { error }) => {
            if (error) return <p>{onError(error)}</p>

            return (
              <div>
                <button onClick={() => {
                    likeChat({ variables: { chatId: this.props.chatId }})
                  }}
                >
                  Like Chat
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

export default LikeChat
