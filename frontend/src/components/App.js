import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from './Header';
import MyEditor from './MyEditor';
import Login from './Login';
import SignUp from './SignUp';
import withRoot from './withRoot';
import { loggedUser } from '../utils';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" render={() => <Header user={loggedUser()} />} />

        <Route
          exact
          path="/"
          render={() => {
            const redirectTo = loggedUser() ? '/notes' : '/login';
            return <Redirect to={redirectTo} />;
          }}
        />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/notes" component={MyEditor} />
        <PrivateRoute exact path="/note/:id" component={MyEditor} />
      </div>
    );
  }
}

export default withRoot(App);
