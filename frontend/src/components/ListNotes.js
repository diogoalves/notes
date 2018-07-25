import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ListNotes extends Component {
  open = id => () => {
    this.props.history.push(`/note/${id}`);
  };

  delete = id => async () => {
    await this.props.deleteNoteMutation({
      variables: {
        id
      },
      update: (store, { data: { deleteNote } }) => {
        const state = store.readQuery({ query: NOTES_QUERY });
        //state.notes = state.notes.filter( e => e.id !== deleteNote.id );
        // store.writeQuery({ query: NOTES_QUERY, state })
      }
    });
  };

  render() {
    const { data } = this.props;
    if (data && data.loading) {
      return <div>Loading</div>;
    }

    if (data && data.error) {
      return <div>Error</div>;
    }
    const { classes } = this.props;
    const { notes } = data;
    return (
      <div>
        <Button
          className={classes.button}
          onClick={this.open('new')}
          variant="contained"
          color="primary"
        >
          NEW NOTE
        </Button>

        {notes.map((e, i) => (
          <Card key={e.id} className={classes.card}>
            <CardHeader
              className={classes.card}
              title={e.content}
              subheader={`Create by ${e.createdBy.name} on ${e.createdAt}`}
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
    );
  }
}

export const NOTES_QUERY = gql`
  query NotesQuery {
    notes {
      id
      content
      createdAt
      updatedAt
      createdBy {
        id
        name
      }
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

export default compose(
  graphql(NOTES_QUERY, { name: 'data' }),
  graphql(DELETENOTE_MUTATION, { name: 'deleteNoteMutation' })
)(withStyles(styles)(ListNotes));
