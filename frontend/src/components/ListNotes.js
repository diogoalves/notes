import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import { shortTitle } from '../utils';

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing.unit * 8
  },
  card: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
    const { data } = this.props;
    if (data && data.loading) {
      return <div>Loading</div>;
    }

    if (data && data.error) {
      return <div>Error</div>;
    }
    const { classes, history } = this.props;
    const { notes } = data;
    return (
      <div>
        <Header history={history}>
          <Button
            className={classes.button}
            onClick={this.open('new')}
            variant="contained"
            color="secondary"
          >
            NEW NOTE
          </Button>
        </Header>

        <div className={classes.paper}>
          {notes.map((e, i) => (
            <Card key={e.id} className={classes.card}>
              <CardHeader
                className={classes.card}
                title={shortTitle(e.content)}
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
