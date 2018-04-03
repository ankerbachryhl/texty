import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import ChatRoom from './ChatRoom';
import Login from './Login';
import Header from './Header';
import Chats from './Chats';

import { AUTH_TOKEN } from '../constants'

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="App">
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
              <Route path="/" component={Login} />
            </Switch>
          )}
      </div>
    );
  }
}

export default App;
