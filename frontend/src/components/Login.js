import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { saveUserData } from '../utils';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    isSignUp: false,
    name: ''
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value.trim(),
      error: null
    });
  };

  toggleSignUp = () => {
    this.setState(currentState => ({
      ...currentState,
      isSignUp: !currentState.isSignUp,
      error: null
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password, isSignUp, name } = this.state;
    try {
      if (isSignUp) {
        const result = await this.props.signUpMutation({
          variables: {
            email,
            password,
            name
          }
        });
        const { token, user } = result.data.signup;
        saveUserData(token, user.name);
        this.props.history.push(`/`);
      } else {
        const result = await this.props.loginMutation({
          variables: {
            email,
            password
          }
        });
        const { token, user } = result.data.login;
        saveUserData(token, user.name);
        this.props.history.push(`/`);
      }
    } catch (error) {
      const message = error.message.replace('GraphQL error: ', '');
      this.setState({ ...this.state, error: message });
    }
  };

  render() {
    const { email, password, isSignUp, name, error } = this.state;
    return (
      <Dialog open aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            {isSignUp && (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                onChange={this.handleChange('name')}
                value={name}
              />
            )}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              onChange={this.handleChange('email')}
              value={email}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={this.handleChange('password')}
              value={password}
            />
            {error && (
              <Typography variant="caption" gutterBottom align="center">
                {error}
              </Typography>
            )}
          </form>
        </DialogContent>
        {isSignUp && (
          <DialogActions>
            <Button color="primary" onClick={this.toggleSignUp}>
              Already have an account?
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        )}
        {!isSignUp && (
          <DialogActions>
            <Button color="primary" onClick={this.toggleSignUp}>
              Need to create an account?
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Login
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        name
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signUpMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' })
)(Login);
