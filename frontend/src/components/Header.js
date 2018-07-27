import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { loggedUser, cleanLoggedUser } from '../utils';

const styles = {
  root: {
    flexGrow: 1
  },
  appbar: {
    position: 'fixed'
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends Component {
  handleLogout = () => {
    const { client, history } = this.props;
    cleanLoggedUser();
    client.resetStore();
    history.push(`/`);
  };

  render() {
    const { classes } = this.props;
    const user = loggedUser();
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <div className={classes.flex}>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Notes
              </Typography>
            </div>
            {this.props.children}
            {user && (
              <div>
                <Button onClick={this.toggle} color="inherit">
                  <AccountCircle />
                  {user}
                </Button>
                <Button onClick={this.handleLogout} color="inherit">
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withApollo(withStyles(styles)(Header)));
