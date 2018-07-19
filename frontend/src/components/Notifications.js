import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import actions from '../actions';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class Notifications extends Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.dispatch(actions.cleanNotification());
  };

  render() {
    const { notification, classes } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={notification}
          transitionDuration={100}
          onClose={this.handleClose}
          onExited={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{notification}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps)(withStyles(styles)(Notifications));
