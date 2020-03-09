import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth';
import { useRezept } from '../../data';
import ErrorMessage from '../../ErrorMessage';
import Fab from '../../Fab';
import { Grid, GridTile } from '../../Grid';
import KategorieChips from '../../KategorieChips';
import Layout from '../../Layout';
import Loading from '../../Loading';
import UserChip from '../../UserChip';

export default function RezeptPage() {
  const { id } = useParams();
  const [rezept, loading, error] = useRezept(id);

  return (
    <Layout title={rezept && rezept.title} gutter back="/rezepte">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !rezept && <ErrorMessage message="Rezept nicht gefunden" />}
      {rezept && <Rezept rezept={rezept} />}
    </Layout>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  images: {
    marginTop: spacing(2),
  },
  meta: {
    float: 'right',
    marginLeft: spacing(2),
    marginBottom: spacing(2),
  },
}));

function Rezept({ rezept }) {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <>
      <Card className={classes.meta}>
        <CardContent>
          <Typography gutterBottom component="div">
            <UserChip id={rezept.owner} />
          </Typography>
          {rezept.updatedAt && (
            <Typography variant="caption" component="p" gutterBottom>
              Aktualisiert: {new Date(rezept.updatedAt.seconds * 1000).toLocaleString()}
            </Typography>
          )}
          {rezept.kategorien && <KategorieChips kategorieIds={Object.keys(rezept.kategorien)} link />}
        </CardContent>
      </Card>
      <Typography style={{ whiteSpace: 'pre-line' }}>{rezept.text}</Typography>
      {rezept.images && rezept.images.length > 0 && (
        <Grid className={classes.images}>
          {rezept.images.map((image) => (
            <GridTile key={image.src} style={{ backgroundImage: `url(${image.src})` }} />
          ))}
        </Grid>
      )}
      {user.id === rezept.owner && (
        <Fab color="secondary" component={Link} to={`/rezepte/${rezept.id}/bearbeiten`}>
          <EditIcon />
        </Fab>
      )}
    </>
  );
}
