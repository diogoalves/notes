import React, { Component } from 'react';
import { graphql } from 'react-apollo';
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
        <Button className={classes.button} variant="contained" color="primary">
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

export default graphql(NOTES_QUERY, { name: 'data' })(
  withStyles(styles)(ListNotes)
);
