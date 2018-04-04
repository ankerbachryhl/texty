import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Message from './Message';
import CreateMessage from './CreateMessage';
import MediaUploader from './MediaUploader';

import { AUTH_TOKEN } from '../constants'

export const MESSAGES_QUERY = gql`
  query getChatMessages($chatId: String!) {
    chatMessages(chatId: $chatId) {
      content
      media
      createdAt
      id
      sendBy {
        name
      }
    }
  }
`

const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      node {
        content
        media
        createdAt
        id
        sendBy {
          name
        }
      }
    }
  }
`

class ChatRoom extends Component {

  state = { chatId: this.props.location.state.chatId }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <div>
        {authToken ? (
          <div>
            <Query
              query={MESSAGES_QUERY}
              variables={{ chatId: this.state.chatId }}
            >
              {({ loading, error, subscribeToMore, ...result }) => {
                if (loading) return `Loading messages - *wheel spinning*`;
                if (error) return "Error :/ Error :/ Error :/"

                return (
                  <ChatRoomWithData
                    {...result}
                    subscribeToNewMessages={() => (
                      subscribeToMore({
                        document: MESSAGES_SUBSCRIPTION,
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev;
                          const newMessage = subscriptionData.data.newMessage.node;
                          const newDataArray = [...prev.chatMessages, newMessage];
                          return ({
                            ...prev,
                            chatMessages: newDataArray,
                          })
                        }
                      })
                    )}
                  />
                )
              }}

            </Query>
            <CreateMessage chatId={this.state.chatId} />
            <MediaUploader chatId={this.state.chatId} />
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

class ChatRoomWithData extends Component {

  componentDidMount() {
    this.props.subscribeToNewMessages()
  }

  render() {
    return (
      this.props.data.chatMessages.map(message =>
        <Message key={message.id} message={message} />)
    )
  }
}

export default ChatRoom
