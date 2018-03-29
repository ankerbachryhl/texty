import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { AUTH_TOKEN } from '../constants'

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: '',
  }

  submit = async () => {
    const { name, email, password } = this.state

    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })

      const { token } = result.data.login
      this.saveUserToken(token)
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password,
        },
      })

      const { token } = result.data.signup
      this.saveUserToken(token)
    }
    this.props.history.push(`/chat`)
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
            type="text"
            placeholder={this.state.login ? "Enter your password" : "Make a password" }
          />
        </div>

        <div>
          <button onClick={() => this.submit()}>
            {this.state.login ? "Log in" : "Create account"}
          </button>
        </div>
        <div onClick={() => this.setState({ login: !this.state.login })}>
          { this.state.login ? "Need to create an account?" : "Already have an account?"}
        </div>
      </div>
    )
  }
}

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

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation'}),
) (Login)
