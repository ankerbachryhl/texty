import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import onError from '../utils';

const LIKE_CHAT = gql`
  mutation likeChat($chatId: String!) {
    likeChat(chatId: $chatId) {
      id
      chat {
        id
        likeCount
      }
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
            const { chats } = cache.readQuery({ query: this.props.query })
            const likedChat = chats.findIndex(chat => chat.id === this.props.chatId)

            chats[likedChat].likes.push(likeChat)
            chats[likedChat].likeCount = likeChat.chat.likeCount

            cache.writeQuery({
              query: this.props.query,
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
                <button className="button is-primary is-medium is-outlined" onClick={() => {
                    likeChat({ variables: { chatId: this.props.chatId }})
                  }}
                >
                <span className="icon"><i className="fas fa-angle-up"></i></span>
                  <span>Upvote</span>
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
