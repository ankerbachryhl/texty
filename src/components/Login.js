import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { AUTH_TOKEN } from '../constants'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`
const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: '',
  }

  saveUserToken = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    return (
      <div>
        <h1>{this.state.login ? 'Login' : 'Sign up'}</h1>
        <div>
          {!this.state.login && (
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Enter username"
            />
          )}

          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder={this.state.login ? "Enter your email" : "Enter an email" }
          />

          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder={this.state.login ? "Enter your password" : "Make a password" }
          />
        </div>

        <Mutation mutation={LOGIN_MUTATION} onCompleted={( data ) => {
          this.saveUserToken(data.login.token)
          this.props.history.push(`/`)
        }}>
          {(login, { data, error }) => {
            let errorMessage = ''
            if(error) {
              errorMessage = error.message.replace('GraphQL error:', '')
            }

            return (
              <Mutation
                mutation={SIGNUP_MUTATION}
                onCompleted={( data ) => {
                  this.saveUserToken(data.signup.token)
                  this.props.history.push(`/`)
                }}
              >
                {(signup, { data, error }) => {
                  const { name, email, password } = this.state
                  if(error) {
                    errorMessage = error.message.replace('GraphQL error:', '')
                  }

                  return (
                    <LoginButton
                      text={this.state.login ? "Log in" : "Create account"}
                      error={errorMessage}
                      login={this.state.login ? true : false}
                      mutationFunction={this.state.login ? login : signup}
                      name={name}
                      email={email}
                      password={password}
                    />
                  )
                }}
              </Mutation>
            )}
          }
        </Mutation>

        <div onClick={() => this.setState({ login: !this.state.login })}>
          { this.state.login ? "Need to create an account?" : "Already have an account?"}
        </div>
      </div>
    )
  }
}

class LoginButton extends Component {
  render() {
    const { name, email, password, mutationFunction, login, error, text } = this.props
    return (
      <div>
        <p>{this.props.error}</p>
        <button onClick={() => {
            if (login) {
              mutationFunction({ variables: {
                email,
                password,
              }})
            } else {
              mutationFunction({ variables: {
                name,
                email,
                password,
              }})
            }
          }}>
          {text}
        </button>
      </div>
    )
  }
}

export default Login
