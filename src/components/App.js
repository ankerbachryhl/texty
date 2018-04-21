import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../Main.css';

import ChatRoom from './ChatRoom/ChatRoom';
import Login from './Login';
import Header from './Header';
import Chats from './Chats';
import Landingpage from './Landingpage'

import { AUTH_TOKEN } from '../constants'

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="Landingpage">
        <Header />
          {authToken && (
            <Switch>
              <Route exact path="/" component={Chats} />
              <Route exact path="/chat/:id" component={ChatRoom} />
              <Route exact path="/login" component={Login} />
            </Switch>
          )}
          {!authToken && (
            <Switch>
              <Route exact path="/" component={Landingpage} />
              <Route exaxt path="/login" component={Login} />
            </Switch>
          )}
      </div>
    );
  }
}

export default App;
