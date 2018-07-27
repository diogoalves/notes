import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Header from './Header';
import { NOTES_QUERY } from './ListNotes';

class Editor extends Component {
  state = { value: '' };

  handleChange = event => this.setState({ value: event.target.value });

  render() {
    const {
      classes,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <div className={classes.root}>
        <MyHeader classes={classes} history={history} save={this.save} />
        <Query query={NOTE_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <Paper className={classes.paper} elevation={1}>
                <Input
                  autoFocus
                  className={classes.input}
                  onChange={this.handleChange}
                  multiline
                  defaultValue={data.note ? data.note.content : ''}
                />
              </Paper>
            );
          }}
        </Query>
      </div>
    );
  }

  save = async () => {
    const currentId = this.props.match.params.id;
    await this.props.saveNoteMutation({
      variables: {
        id: currentId,
        content: this.state.value
      },
      update: (cache, { data: { saveNote } }) => {
        const { notes } = cache.readQuery({ query: NOTES_QUERY });
        cache.writeQuery({
          query: NOTES_QUERY,
          data: {
            notes: [saveNote, ...notes.filter(e => e.id !== saveNote.id)]
          }
        });
      }
    });
    this.props.history.push(`/`);
  };
}

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

const NOTE_QUERY = gql`
  query NoteQuery($id: ID!) {
    note(id: $id) {
      id
      content
      createdBy {
        name
      }
    }
  }
`;

const SAVENOTE_MUTATION = gql`
  mutation SaveNoteMutation($id: ID!, $content: String!) {
    saveNote(id: $id, content: $content) {
      id
      content
      updatedAt
      createdBy {
        name
      }
    }
  }
`;

const MyHeader = ({ history, save, classes }) => (
  <Header history={history}>
    <Button
      className={classes.button}
      onClick={save}
      variant="contained"
      color="secondary"
    >
      SAVE
    </Button>
    <Button
      className={classes.button}
      onClick={() => history.push(`/`)}
      variant="contained"
      color="secondary"
    >
      CANCEL
    </Button>
  </Header>
);

export default graphql(SAVENOTE_MUTATION, { name: 'saveNoteMutation' })(
  withStyles(styles)(Editor)
);
