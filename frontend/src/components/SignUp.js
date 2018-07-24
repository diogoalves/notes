import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { saveUserData } from '../utils';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value.trim()
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password, name } = this.state;
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
  };

  render() {
    const { email, password, name } = this.state;
    return (
      <Dialog open aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
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
            <TextField
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
          </form>
        </DialogContent>
        <DialogActions>
          <Link to="/login">
            <Button color="primary">Already have an account?</Button>
          </Link>
          <Button onClick={this.handleSubmit} color="primary">
            Sign Up
          </Button>
        </DialogActions>
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

export default graphql(SIGNUP_MUTATION, { name: 'signUpMutation' })(SignUp);
