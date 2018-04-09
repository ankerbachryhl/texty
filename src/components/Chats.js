import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import onError from '../utils';

import ChatRoom from './ChatRoom/ChatRoom'
import CreateChat from './CreateChat'
import Like from './Like'

export const CHATS_QUERY = gql`
  query getChats {
    chats {
      id
      name
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

class Chats extends Component {
  render() {
    return (
      <div>
        <Query query={CHATS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{onError(error)}</p>;

            return (
              data.chats.map(chat => <ChatSneakPeak key={chat.id} chat={chat} />)
            )
          }}
        </Query>
        <CreateChat />
      </div>
    )
  }
}

const ChatSneakPeak = ({chat}) => (
  <div>
    <Link to={{ pathname: '/chat/' + chat.id,
      state: { chatId: chat.id, chatName: chat.name }}}
    >
      <h1>{chat.name}</h1>
      <h3>{chat.createdAt}</h3>
      <h4>Flames: {chat.likes.length}</h4>
      {chat.messages && (
        <div>
          <h3>Last three messages:</h3>
          <div>
            {chat.messages.map(message => <p key={message.id}>{message.content}</p>)}
          </div>
        </div>
      )}
    </Link>
    <Like chatId={chat.id} />
  </div>
)

export default Chats
