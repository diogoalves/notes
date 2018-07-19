import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class LoginDialog extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value.trim()
    });
  };

  render() {
    const { username, password } = this.state;
    const { show, toggle, signIn, signUp } = this.props;
    return (
      <Dialog open={show} onClose={toggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log in</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={this.handleChange('username')}
            value={username}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="primary">
            Cancel
          </Button>
          <Button onClick={() => signIn(username, password)} color="primary">
            Login
          </Button>
          <Button onClick={() => signUp(username, password)} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LoginDialog;
