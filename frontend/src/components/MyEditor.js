import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Header from './Header';
import { NOTES_QUERY } from './ListNotes';
import ActionButton from './ActionButton';

class Editor extends Component {
  state = { value: '' };

  handleChange = event => this.setState({ value: event.target.value });

  render() {
    const {
      classes,
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <div className={classes.root}>
        <Header>
          <ActionButton label="SAVE" action={this.save} />
          <ActionButton label="CANCEL" action={this.cancel} />
        </Header>
        <Query query={NOTES_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            const note = data.notes[0] || {};
            return (
              <Paper className={classes.paper} elevation={1}>
                <Input
                  autoFocus
                  className={classes.input}
                  onChange={this.handleChange}
                  multiline
                  defaultValue={note.content}
                />
              </Paper>
            );
          }}
        </Query>
      </div>
    );
  }

  //TODO add an optimistic update
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

  cancel = () => this.props.history.push(`/`);
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
  }
});

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

export default graphql(SAVENOTE_MUTATION, { name: 'saveNoteMutation' })(
  withStyles(styles)(Editor)
);
