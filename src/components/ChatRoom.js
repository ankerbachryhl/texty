import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Message from './Message'
import MessageInput from './MessageInput'

import { AUTH_TOKEN } from '../constants'


class ChatRoom extends Component {

  componentDidMount() {
    this.subscribeToNewMessages()
  }


  subscribeToNewMessages = () => {
    this.props.chatQuery.subscribeToMore({
      document: gql`
        subscription {
          newMessage {
            node {
              content
              createdAt
              id
              sendBy {
                name
              }
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newMessage = subscriptionData.data.newMessage.node
        const newArray = [...previous.getChat, newMessage]

        const result = {
          ...previous,
          getChat: newArray,
        }
        return result
      },
    })
  }

  renderMessages() {
    if (this.props.chatQuery && this.props.chatQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.chatQuery && this.props.chatQuery.error) {
      console.log(this.props.chatQuery.error)
      return <div>Error</div>
    }

    const chatMessages = this.props.chatQuery.getChat
    console.log(chatMessages)

    return chatMessages.map(message =>
      <Message key={message.id} message={message} />)
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <div>
        {authToken ? (
          <div>
            {this.renderMessages()}
            <MessageInput />
          </div>
        ) : (
          <div>
            <h1>You need to be logged in to chat</h1>
          </div>
        )}
      </div>
    )
  }
}

//GraphQL data query

export const CHAT_QUERY = gql`
  query ChatQuery {
    getChat {
      content
      createdAt
      id
      sendBy {
        name
      }
    }
  }
`

export default graphql(CHAT_QUERY, { name: 'chatQuery' }) (ChatRoom)
