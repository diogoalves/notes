import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import MyEditor from './MyEditor';
import Login from './Login';
import SignUp from './SignUp';
import ListNotes from './ListNotes';
import withRoot from './withRoot';
import { loggedUser } from '../utils';

class App extends Component {
  render() {
    return (
      <div>
        <Route
          path="/"
          render={props => <Header {...props} user={loggedUser()} />}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={ListNotes} />
        <PrivateRoute exact path="/notes" component={ListNotes} />
        <PrivateRoute exact path="/note/:id" component={MyEditor} />
      </div>
    );
  }
}

export default withRoot(App);
