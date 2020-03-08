import { Button, GridListTileBar, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRezepte } from '../../data';
import ErrorMessage from '../../ErrorMessage';
import Layout from '../../Layout';
import Loading from '../../Loading';
import NeuesRezeptFab from './NeuesRezeptFab';

export default function Rezepte() {
  const [rezepte, loading, error] = useRezepte();

  return (
    <Layout gutter>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {rezepte && <RezepteList rezepte={rezepte} />}
      <NeuesRezeptFab />
    </Layout>
  );
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  grid: {
    display: 'grid',
    gap: `${spacing(2)}px`,
    gridAutoRows: '1fr',
    [breakpoints.up('sm')]: {
      gridTemplateColumns: `repeat(auto-fill, minmax(45%, 1fr))`,
    },
    [breakpoints.up('md')]: {
      gridTemplateColumns: `repeat(auto-fill, minmax(30%, 1fr))`,
    },
    [breakpoints.up('lg')]: {
      gridTemplateColumns: `repeat(auto-fill, minmax(17%, 1fr))`,
    },
  },
  sizingTile: {
    width: 0,
    paddingBottom: '100%',
    gridRow: '1 / 1',
    gridColumn: '1 / 1',
  },
  tile: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    textTransform: 'none',
    fontWeight: 'normal',
    textAlign: 'left',
    padding: 0,
    '&:nth-child(2)': {
      gridRow: '1 / 1',
      gridColumn: '1 / 1',
    },
  },
}));

function RezepteList({ rezepte }) {
  const classes = useStyles();

  if (!rezepte.length) return <ErrorMessage message="Keine Rezepte gefunden." />;

  return (
    <div className={classes.grid}>
      <div className={classes.sizingTile} />
      {rezepte.map((rezept) => (
        <Button
          key={rezept.id}
          component={Link}
          to={`/rezepte/${rezept.id}`}
          className={classes.tile}
          style={{ backgroundImage: rezept.images && rezept.images.length > 0 ? `url(${rezept.images[0].src})` : undefined }}
        >
          <GridListTileBar title={rezept.title} />
        </Button>
      ))}
    </div>
  );
}
