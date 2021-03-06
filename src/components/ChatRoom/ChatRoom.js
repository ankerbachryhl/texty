import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import onError from '../../utils';

import Message from './Message';
import CreateMessage from './CreateMessage';
import MediaUploader from './MediaUploader';

import { AUTH_TOKEN } from '../../constants'

export const MESSAGES_QUERY = gql`
  query getChatMessages($chatId: String!) {
    chatMessages(chatId: $chatId) {
      content
      media
      createdAt
      id
      sendBy {
        name
        id
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
          id
        }
      }
    }
  }
`

class ChatRoom extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { chatId, chatName } = this.props.location.state;

    return (
      <div className="content">
        {authToken ? (
          <div>
            <h1 className="is-size-2 has-text-black">Current chat: {chatName}</h1>

            <Query
              query={MESSAGES_QUERY}
              variables={{ chatId }}
            >
              {({ loading, error, subscribeToMore, ...result }) => {
                if (loading) return `Loading messages - *wheel spinning*`;
                if (error) return <p>{onError(error)}</p>;

                return (
                  <ChatRoomWithData
                    {...result}
                    subscribeToNewMessages={() => (
                      subscribeToMore({
                        document: MESSAGES_SUBSCRIPTION,
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev;
                          const newMessage = subscriptionData.data.newMessage.node;
                          const newMessagesArray = [...prev.chatMessages, newMessage];
                          return ({
                            ...prev,
                            chatMessages: newMessagesArray,
                          })
                        }
                      })
                    )}
                  />
                )
              }}
            </Query>
            <CreateMessage chatId={chatId} />
            <MediaUploader chatId={chatId} />
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
