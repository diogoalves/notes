import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import { fromNow, shortTitle } from '../utils';
import ActionButton from './ActionButton';

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing.unit * 9
  },
  card: {
    margin: theme.spacing.unit
  }
});

class ListNotes extends Component {
  newNote = () => this.props.history.push(`/note/new`);

  open = id => () => this.props.history.push(`/note/${id}`);

  delete = id => async () => {
    await this.props.deleteNoteMutation({
      variables: {
        id
      },
      update: (cache, { data: { deleteNote } }) => {
        const { notes } = cache.readQuery({ query: NOTES_QUERY });
        cache.writeQuery({
          query: NOTES_QUERY,
          data: {
            notes: notes.filter(e => e.id !== deleteNote.id)
          }
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={NOTES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className={classes.root}>
              <Header>
                <ActionButton label="NEW NOTE" action={this.newNote} />
              </Header>
              <div className={classes.paper}>
                {data.notes.map(e => (
                  <Card key={e.id} className={classes.card}>
                    <CardHeader
                      className={classes.card}
                      title={shortTitle(e.content)}
                      subheader={`updated ${fromNow(e.updatedAt)}`}
                    />
                    <CardActions>
                      <Button size="small" onClick={this.open(e.id)}>
                        OPEN
                      </Button>
                      <Button size="small" onClick={this.delete(e.id)}>
                        DELETE
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export const NOTES_QUERY = gql`
  query NotesQuery($id: ID) {
    notes(id: $id) {
      id
      content
      updatedAt
    }
  }
`;

const DELETENOTE_MUTATION = gql`
  mutation DeleteNoteMutation($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export default graphql(DELETENOTE_MUTATION, { name: 'deleteNoteMutation' })(
  withStyles(styles)(ListNotes)
);
