import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../utils';

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isLogged() ? <Component {...this.props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}

export default PrivateRoute;
