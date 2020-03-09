import { Button, GridListTileBar, makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import qs from 'query-string';
import React, { useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useKategorien, useRezepte } from '../../data';
import ErrorMessage from '../../ErrorMessage';
import Fab from '../../Fab';
import { Grid, GridTile } from '../../Grid';
import Layout from '../../Layout';
import Loading from '../../Loading';
import RezepteFilter from './RezepteFilter';

const useStyles = makeStyles(({ spacing }) => ({
  filter: {
    marginBottom: spacing(2),
  },
}));

function useFilter() {
  const location = useLocation();
  const navigate = useNavigate();
  const filter = useMemo(() => {
    const search = qs.parse(location.search);
    return {
      search: search.search,
      kategorien: search.kategorien ? search.kategorien.split(',') : [],
    };
  }, [location.search]);

  const setFilter = useCallback(
    (updater) => {
      const nextFilter = typeof updater === 'function' ? updater(filter) : updater;
      navigate(
        `${location.pathname}?${qs.stringify({
          search: nextFilter.search || undefined,
          kategorien: nextFilter.kategorien && nextFilter.kategorien.length ? nextFilter.kategorien.join(',') : undefined,
        })}`
      );
    },
    [filter, navigate, location]
  );

  return [filter, setFilter];
}

export default function Rezepte() {
  const classes = useStyles();
  const [filter, setFilter] = useFilter();
  const [rezepte, loading, error] = useRezepte({ filter });

  return (
    <Layout gutter>
      <RezepteFilter filter={filter} setFilter={setFilter} className={classes.filter} />
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
  const kategorien = useKategorien();
  const sorted = useMemo(() => [...rezepte].sort((a, b) => a.title.localeCompare(b.title)), [rezepte]);

  if (!sorted.length) return <ErrorMessage message="Keine Rezepte gefunden." />;

  return (
    <Grid>
      {sorted.map((rezept) => (
        <GridTile
          key={rezept.id}
          component={ButtonLink}
          to={`/rezepte/${rezept.id}`}
          style={{ backgroundImage: rezept.images && rezept.images.length > 0 ? `url(${rezept.images[0].src})` : undefined }}
        >
          <GridListTileBar
            title={rezept.title}
            subtitle={
              rezept.kategorien &&
              Object.keys(rezept.kategorien)
                .map((id) => kategorien.find((k) => k.id === id))
                .filter(Boolean)
                .map((k) => k.label)
                .sort((a, b) => a.localeCompare(b))
                .join(', ')
            }
          />
        </GridTile>
      ))}
    </Grid>
  );
}

function ButtonLink(props) {
  return <Button component={Link} {...props} />;
}
