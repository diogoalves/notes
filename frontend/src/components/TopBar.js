import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MenuAppBar extends React.Component {
  state = {
    showLogin: false
  };

  toggleShowLogin = () => {
    this.setState(state => ({ showLogin: !state.showLogin }));
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { showLogin } = this.state;
    const { username, classes, signIn, signOut, signUp } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Notes
            </Typography>
            {!username && (
              <div>
                <Button onClick={this.toggleShowLogin} color="inherit">
                  Login
                </Button>
              </div>
            )}
            {username && (
              <div>
                <Button onClick={this.toggle} color="inherit">
                  <AccountCircle />
                  {username}
                </Button>
                <Button onClick={signOut} color="inherit">
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <LoginDialog
          show={showLogin}
          toggle={this.toggleShowLogin}
          signIn={signIn}
          signOut={signOut}
          signUp={signUp}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MenuAppBar);
