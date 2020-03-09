import { Chip, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import React, { useCallback, useMemo } from 'react';
import { useKategorien } from '../../data';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  search: {
    marginRight: spacing(2),
    marginBottom: spacing(1),
    flex: 1,
    minWidth: '10rem',
  },
  chip: {
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
}));

export default function RezepteFilter({ filter, setFilter, className, ...props }) {
  const classes = useStyles();
  const setSearch = useCallback((search) => setFilter((f) => ({ ...f, search })), [setFilter]);
  const kategorien = useKategorien();
  const sortedKategorien = useMemo(() => [...kategorien].sort((a, b) => a.label.localeCompare(b.label)), [kategorien]);
  const addKategorie = useCallback((id) => () => setFilter((f) => ({ ...f, kategorien: [...f.kategorien, id] })), [setFilter]);
  const deleteKategorie = useCallback((id) => () => setFilter((f) => ({ ...f, kategorien: f.kategorien.filter((k) => k !== id) })), [setFilter]);

  return (
    <div className={`${classes.root} ${className || ''}`} {...props}>
      <TextField
        type="search"
        value={filter.search || ''}
        onChange={(e) => setSearch(e.currentTarget.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className={classes.search}
      />
      {sortedKategorien.map((kategorie) => {
        const active = filter.kategorien.includes(kategorie.id);
        return (
          <Chip
            key={kategorie.id}
            label={kategorie.label}
            className={classes.chip}
            color={active ? 'secondary' : 'default'}
            onClick={active ? deleteKategorie(kategorie.id) : addKategorie(kategorie.id)}
            onDelete={active ? deleteKategorie(kategorie.id) : undefined}
          />
        );
      })}
    </div>
  );
}
