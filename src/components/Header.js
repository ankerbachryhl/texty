import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { AUTH_TOKEN } from '../constants'

const Header = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <nav className="navbar is-transparent header">
      <div className="navbar-brand">
        <p className="is-size-1 has-text-primary">texty</p>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/">
                <p className="button is-primary is-outlined is-medium">All chats</p>
            </Link>
          </div>
          <div className="navbar-item">
            <a
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                props.history.push(`/`);
              }}
              className="button is-danger is-outlined is-medium"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
