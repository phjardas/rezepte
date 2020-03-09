import { Chip, makeStyles } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useKategorien } from '../../data';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: spacing(1),
  },
}));

export default function RezepteFilter({ filter, setFilter, className, ...props }) {
  const classes = useStyles();
  const kategorien = useKategorien();
  const sorted = useMemo(() => [...kategorien].sort((a, b) => a.label.localeCompare(b.label)), [kategorien]);
  const onAdd = useCallback((id) => () => setFilter((f) => ({ ...f, kategorien: [...f.kategorien, id] })), [setFilter]);
  const onDelete = useCallback((id) => () => setFilter((f) => ({ ...f, kategorien: f.kategorien.filter((k) => k !== id) })), [setFilter]);

  return (
    <div className={`${classes.root} ${className || ''}`} {...props}>
      {sorted.map((kategorie) => {
        const active = filter.kategorien.includes(kategorie.id);
        return (
          <Chip
            key={kategorie.id}
            label={kategorie.label}
            className={classes.chip}
            color={active ? 'secondary' : 'default'}
            onClick={active ? onDelete(kategorie.id) : onAdd(kategorie.id)}
            onDelete={active ? onDelete(kategorie.id) : undefined}
          />
        );
      })}
    </div>
  );
}
