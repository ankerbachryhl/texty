import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import ChatRoom from './ChatRoom';
import Login from './Login'
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/chat" component={ChatRoom} />
        </Switch>
      </div>
    );
  }
}

export default App;
