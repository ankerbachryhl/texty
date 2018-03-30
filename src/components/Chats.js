import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'


import ChatRoom from './ChatRoom'

const CHATS_QUERY = gql`
  query getChats {
    chats {
      id
      name
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
            if (error) return <p>Error..</p>;
            return (
              data.chats.map(chat => <ChatSneakPeak chat={chat} />)
            )
          }}
        </Query>
      </div>
    )
  }
}

const ChatSneakPeak = ({chat}) => (
  <div>
    <Link to={{ pathname: '/chat/' + chat.name, state: { chatId: chat.id }}}>
      <h1>{chat.name}</h1>
    </Link>
  </div>
)

export default Chats
