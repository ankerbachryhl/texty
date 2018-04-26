import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import onError from '../utils';

import ChatRoom from './ChatRoom/ChatRoom'
import CreateChat from './CreateChat'
import Like from './Like'

const TOP_CHATS_QUERY = gql`
  query getChats {
    chats(orderBy: likeCount_DESC) {
      id
      name
      createdAt
      likeCount
      likes {
        id
      }
  	}
  }
`

const NEWEST_CHATS_QUERY = gql`
  query getChats {
    chats(orderBy: createdAt_DESC) {
      id
      name
      createdAt
      likeCount
      likes {
        id
      }
  	}
  }
`

class Chats extends Component {
  state = { showTop: true }

  render() {
    return (
      <div className="chats-overview">
        <div className="create-chat content">
          <CreateChat query={this.state.showTop ? TOP_CHATS_QUERY : NEWEST_CHATS_QUERY }/>
        </div>
        <div className="filter content">
          <button className="button is-medium is-primary is-outlined" onClick={() => this.setState({ showTop: !this.state.showTop })}>{this.state.showTop ? "Show newest" : "Show top"}</button>
        </div>
        <div className="columns is-multiline is-centered">
          {this.state.showTop && (
            <Query query={TOP_CHATS_QUERY} >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>{onError(error)}</p>;

                return data.chats.map(chat => <ChatSneakPeak key={chat.id} chat={chat} showTop={this.state.showTop} />)
              }}
            </Query>
          )}
          {!this.state.showTop && (
            <Query query={NEWEST_CHATS_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>{onError(error)}</p>;

                return data.chats.map(chat => <ChatSneakPeak key={chat.id} chat={chat} showTop={this.state.showTop} />)
              }}
            </Query>
          )}
        </div>
      </div>
    )
  }
}

const ChatSneakPeak = ({chat, showTop}) => (
  <div className="column is-half">

    <div className="box chat content">
      <Link to={{ pathname: '/chat/' + chat.id,
        state: { chatId: chat.id, chatName: chat.name }}}
      >
        <p className="is-size-3 has-text-black">{chat.name}</p>
      </Link>

      <p className="is-size-5 is-italic has-text-success">Created at: {chat.createdAt}</p>
      <p className="is-size-5 has-text-success">Upvotes: {chat.likeCount}</p>
      <Like chatId={chat.id} query={showTop ? TOP_CHATS_QUERY : NEWEST_CHATS_QUERY } />
    </div>
  </div>
)

export default Chats
