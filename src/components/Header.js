import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { AUTH_TOKEN } from '../constants'

const Header = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div>
      {authToken && (
        <div>
          <Link to="/">
              All chats
          </Link>
          <a
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              props.history.push(`/`);
            }}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  )
}

export default withRouter(Header)
