import { Typography } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useRezept } from '../../data';
import ErrorMessage from '../../ErrorMessage';
import Fab from '../../Fab';
import { Grid, GridTile } from '../../Grid';
import Layout from '../../Layout';
import Loading from '../../Loading';
import { useAuth } from '../../auth';

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

function Rezept({ rezept }) {
  const { user } = useAuth();

  return (
    <>
      <Typography style={{ whiteSpace: 'pre-line' }} gutterBottom>
        {rezept.text}
      </Typography>
      {rezept.images && rezept.images.length > 0 && (
        <Grid>
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
