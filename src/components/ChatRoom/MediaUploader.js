import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import onError from '../../utils';

const CREATE_MESSAGE_WITH_MEDIA_MUTATION = gql`
  mutation createMessage($content: String!, $media: String!, $chatId: String!) {
    createMessage(content: $content, media: $media, chatId: $chatId) {
      content
      createdAt
      id
      sendBy {
        name
      }
    }
  }
`

class MediaUploader extends Component {

  state = {error: "", success: ""}

  onDropAccepted = async (acceptedFiles, createMessage) => {

    //Setting loading message
    this.setState({ error: "", success: "Your file is being uploaded"})

    //Making file FormData object to pass to cloudinary
    const file = new FormData();
    file.append('file', acceptedFiles[0])
    file.append("upload_preset", "u8tdluvv")
    file.append("api_key", "666797764456412")

    //Send post request to cloudinary and return data object with url
    const { data } = await axios.post("https://api.cloudinary.com/v1_1/texty/image/upload/", file, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })

    //Create message with media
    await createMessage({ variables: { content: acceptedFiles[0].name, media: data.secure_url, chatId: this.props.chatId }})

    //Set success message
    this.setState({ success: "Your file was uploaded & send"})
  }

  onDropRejected = (rejectedFiles) => (
    this.setState({ succes: "",
      error: "Right now only images and gifs are supported :/"})
  )

  render() {
    return (
      <Mutation mutation={CREATE_MESSAGE_WITH_MEDIA_MUTATION}>
        {(createMessage, {loading, error}) => {
          if (error) return <p>{onError(error)}</p>

          return (
            <div>
              <Dropzone
                multiple={false}
                onDropAccepted={(acceptedFiles) => this.onDropAccepted(acceptedFiles, createMessage)}
                onDropRejected={this.onDropRejected}
                accept="image/jpeg, image/png, image/gif"
              >
                <div>
                  <p>Upload media here</p>
                  <p>{this.state.success ? this.state.success : this.state.error}</p>
                </div>
              </Dropzone>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default MediaUploader
