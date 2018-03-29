import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { AUTH_TOKEN } from '../constants'

const Header = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div>
      {authToken && (
        <Link to="/chat">
            Chat
        </Link>
      )}
      {authToken ? (
          <div
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              props.history.push(`/`);
            }}
          >
            Logout
          </div>
        ) : (
          <Link to="/">
            Login
          </Link>
        )
      }
    </div>
  )
}

export default withRouter(Header)
