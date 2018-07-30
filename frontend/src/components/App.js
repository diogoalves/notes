import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MyEditor from './MyEditor';
import Login from './Login';
import ListNotes from './ListNotes';
import withRoot from './withRoot';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={ListNotes} />
        <PrivateRoute exact path="/note/:id" component={MyEditor} />
      </div>
    );
  }
}

export default withRoot(App);
