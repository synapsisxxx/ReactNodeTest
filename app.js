//use Login and Comments components

import React, { Component } from 'react';
import Login from './components/login';
import Comments from './components/comments/list';

export default class App extends Component {

  state = {
    user: undefined, // no log in
  };

  // logged in
  onLoggedIn = (user) => {
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    return user
      ? <Comments user={user} />
      : <Login onLoggedIn={this.onLoggedIn} />;
  }
}