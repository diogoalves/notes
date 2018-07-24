import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Editor extends Component {
  state = {
    value: ''
  };

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.data && newProps.data.note) {
      this.setState({
        value: newProps.data.note.content || ''
      });
    }
  }

  handleChange = event => this.setState({ value: event.target.value });

  render() {
    const { data } = this.props;
    if (data && data.loading) {
      return <div>Loading</div>;
    }

    if (data && data.error) {
      return <div>Error</div>;
    }
    const { classes = {} } = this.props;
    //const { note } = data;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Button
          className={classes.button}
          onClick={this._save}
          variant="contained"
          color="primary"
        >
          SAVE
        </Button>
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

  _save = async () => {
    const currentId = this.props.match.params.id;
    if (currentId === 'new') {
      const result = await this.props.createNoteMutation({
        variables: {
          content: this.state.value
        }
      });
      const { id } = result.data.createNote;
      this.props.history.push(`/note/${id}`);
    } else {
      await this.props.updateNoteMutation({
        variables: {
          id: currentId,
          content: this.state.value
        }
      });
    }
  };
}

const NOTE_QUERY = gql`
  query NoteQuery($id: ID!) {
    note(id: $id) {
      content
      createdBy {
        id
        name
      }
    }
  }
`;

// todo make an update in local store
const CREATENOTE_MUTATION = gql`
  mutation CreateNoteMutation($content: String!) {
    createNote(content: $content) {
      id
      content
      createdBy {
        id
        name
      }
    }
  }
`;

// todo make an update in local store
const UPDATENOTE_MUTATION = gql`
  mutation UpdateNoteMutation($id: ID!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
      createdBy {
        id
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
  graphql(CREATENOTE_MUTATION, { name: 'createNoteMutation' }),
  graphql(UPDATENOTE_MUTATION, { name: 'updateNoteMutation' })
)(withStyles(styles)(Editor));
