import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

    this.setState({ error: "", success: "Your file is being uploaded"})

    const file = new FormData();
    file.append('file', acceptedFiles[0])
    file.append("upload_preset", "u8tdluvv")
    file.append("api_key", "666797764456412")

    const response = await axios.post("https://api.cloudinary.com/v1_1/texty/image/upload/", file, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })

    console.log(response)

    await createMessage({ variables: { content: acceptedFiles[0].name, media: response.data.secure_url, chatId: this.props.chatId }})

    this.setState({ success: "Your file was uploaded & send"})

  }

  onDropRejected = (rejectedFiles) => (
    this.setState({ succes: "",
      error: "Right now only images and gifs are supported :/"})
  )

  render() {
    return (
      <Mutation mutation={CREATE_MESSAGE_WITH_MEDIA_MUTATION}>
        {(createMessage, {error}) => {
          if (error) return <p>Error</p>


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
                  <p>{this.state.success}</p>
                  <p>{this.state.error}</p>
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
