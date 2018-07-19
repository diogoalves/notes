import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: theme.spacing.unit * 8,
    bottom: 0,
    left: 0,
    right: 0
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
});

class Editor extends Component {
  state = {
    value: ''
  };

  handleChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={1}>
          <Input
            className={classes.input}
            value={value}
            onChange={this.handleChange}
            multiline
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
