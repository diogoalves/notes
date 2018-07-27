import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const ActionButton = ({ action, classes, label }) => (
  <Button
    className={classes.button}
    onClick={action}
    variant="contained"
    color="secondary"
  >
    {label}
  </Button>
);

export default withStyles(styles)(ActionButton);
