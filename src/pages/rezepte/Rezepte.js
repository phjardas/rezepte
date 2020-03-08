import { Button, GridListTileBar } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRezepte } from '../../data';
import ErrorMessage from '../../ErrorMessage';
import Fab from '../../Fab';
import { Grid, GridTile } from '../../Grid';
import Layout from '../../Layout';
import Loading from '../../Loading';

export default function Rezepte() {
  const [rezepte, loading, error] = useRezepte();

  return (
    <Layout gutter>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {rezepte && <RezepteList rezepte={rezepte} />}
      <Fab color="secondary" component={Link} to="/rezepte/_neu">
        <AddIcon />
      </Fab>
    </Layout>
  );
}

function RezepteList({ rezepte }) {
  if (!rezepte.length) return <ErrorMessage message="Keine Rezepte gefunden." />;

  return (
    <Grid>
      {rezepte.map((rezept) => (
        <GridTile
          key={rezept.id}
          component={ButtonLink}
          to={`/rezepte/${rezept.id}`}
          style={{ backgroundImage: rezept.images && rezept.images.length > 0 ? `url(${rezept.images[0].src})` : undefined }}
        >
          <GridListTileBar title={rezept.title} />
        </GridTile>
      ))}
    </Grid>
  );
}

function ButtonLink(props) {
  return <Button component={Link} {...props} />;
}
