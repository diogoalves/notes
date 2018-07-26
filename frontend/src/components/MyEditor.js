import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Header from './Header';

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
    paddingBottom: theme.spacing.unit * 2,
    height: '100%'
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Editor extends Component {
  state = {
    value: ''
  };

  componentDidMount = () => {
    const { note = {} } = this.props.data;
    this.setState({ value: note.content });
  };

  handleChange = event => this.setState({ value: event.target.value });

  render() {
    const { data } = this.props;

    if (data && data.loading) {
      return <div>Loading</div>;
    }

    if (data && data.error) {
      return <div>Error</div>;
    }
    const { classes, history } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Header history={history}>
          <Button
            className={classes.button}
            onClick={this._save}
            variant="contained"
            color="secondary"
          >
            SAVE
          </Button>
          <Button
            className={classes.button}
            onClick={this.back}
            variant="contained"
            color="secondary"
          >
            BACK
          </Button>
        </Header>
        <Paper className={classes.paper} elevation={1}>
          <Input
            autoFocus
            className={classes.input}
            value={value}
            onChange={this.handleChange}
            multiline
          />
        </Paper>
      </div>
    );
  }

  _save = async () => {
    const currentId = this.props.match.params.id;
    // const result = await this.props.saveNoteMutation({
    await this.props.saveNoteMutation({
      variables: {
        id: currentId,
        content: this.state.value
      }
    });
    // const { id } = result.data.saveNote;
    // if (currentId !== id) {
    // this.props.history.push(`/note/${id}`);
    this.props.history.push(`/`);
    // }
  };

  back = () => {
    this.props.history.push(`/`);
  };
}

const NOTE_QUERY = gql`
  query NoteQuery($id: ID!) {
    note(id: $id) {
      content
      createdBy {
        name
      }
    }
  }
`;

// todo make an update in local store
const SAVENOTE_MUTATION = gql`
  mutation SaveNoteMutation($id: ID!, $content: String!) {
    saveNote(id: $id, content: $content) {
      id
      content
      createdBy {
        name
      }
    }
  }
`;

export default compose(
  graphql(NOTE_QUERY, {
    name: 'data',
    options: ownProps => {
      const id = ownProps.match.params.id;
      return {
        variables: { id }
      };
    }
  }),
  graphql(SAVENOTE_MUTATION, { name: 'saveNoteMutation' })
)(withStyles(styles)(Editor));
