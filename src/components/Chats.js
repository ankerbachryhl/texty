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
    chats(orderBy: likeCount_DESC) {
      id
      name
      createdAt
      likeCount
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

export const NEWEST_CHATS_QUERY = gql`
  query getChats {
    chats(orderBy: createdAt_DESC) {
      id
      name
      createdAt
      likeCount
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
  state = { showTop: true }

  render() {
    return (
      <div>
        {this.state.showTop && (
          <Query query={CHATS_QUERY} >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>{onError(error)}</p>;

              return (
                data.chats.map(chat => <ChatSneakPeak key={chat.id} chat={chat} showTop={this.state.showTop} />)
              )
            }}
          </Query>
        )}
        {!this.state.showTop && (
          <Query query={NEWEST_CHATS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>{onError(error)}</p>;

              return (
                data.chats.map(chat => <ChatSneakPeak key={chat.id} chat={chat} showTop={this.state.showTop} />)
              )
            }}
          </Query>
        )}

        <button onClick={() => {
            this.setState({ showTop: false })
            console.log(this.state.showTop)}}>Show newest</button>
        <CreateChat query={this.state.showTop ? CHATS_QUERY : NEWEST_CHATS_QUERY }/>
      </div>
    )
  }
}

const ChatSneakPeak = ({chat, showTop}) => (
  <div>
    <Link to={{ pathname: '/chat/' + chat.id,
      state: { chatId: chat.id, chatName: chat.name }}}
    >
      <h1>{chat.name}</h1>
      <h3>{chat.createdAt}</h3>
      <h4>Flames: {chat.likeCount}</h4>
      {chat.messages && (
        <div>
          <h3>Last three messages:</h3>
          <div>
            {chat.messages.map(message => <p key={message.id}>{message.content}</p>)}
          </div>
        </div>
      )}
    </Link>
    <Like chatId={chat.id} query={showTop ? CHATS_QUERY : NEWEST_CHATS_QUERY } />
  </div>
)

export default Chats
