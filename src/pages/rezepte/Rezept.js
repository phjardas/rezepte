import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { useRezept } from '../../data';
import ErrorMessage from '../../ErrorMessage';
import Layout from '../../Layout';
import Loading from '../../Loading';
import UserChip from '../../UserChip';
import NeuesRezeptFab from './NeuesRezeptFab';

export default function RezeptPage() {
  const { id } = useParams();
  const [rezept, loading, error] = useRezept(id);

  return (
    <Layout title={rezept && rezept.title} gutter back="/rezepte">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !rezept && <ErrorMessage message="Rezept nicht gefunden" />}
      {rezept && <Rezept rezept={rezept} />}
      <NeuesRezeptFab />
    </Layout>
  );
}

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

function Rezept({ rezept }) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={rezept.title} action={<UserChip id={rezept.owner} />} />
      {rezept.images && rezept.images.length > 0 && <CardMedia image={rezept.images[0].src} title={rezept.title} className={classes.media} />}
      <CardContent>
        <Typography style={{ whiteSpace: 'pre-line' }} gutterBottom>
          {rezept.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
