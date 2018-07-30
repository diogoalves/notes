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
import Typography from '@material-ui/core/Typography';
import { saveUserData } from '../utils';

//TODO add login error feedback
//TODO merge Login and SignUp components
class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value.trim(),
      error: null
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      });
      const {
        token,
        user: { name }
      } = result.data.login;
      saveUserData(token, name);
      this.props.history.push(`/`);
    } catch (error) {
      const message = error.message.replace('GraphQL error: ', '');
      this.setState({ ...this.state, error: message });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <Dialog open aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
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
        <DialogActions>
          <Link to="/signUp">
            <Button color="primary">Need to create an account?</Button>
          </Link>
          <Button onClick={this.handleSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

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

export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(Login);
