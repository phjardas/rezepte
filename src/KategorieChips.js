import { Chip, makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useKategorien } from './data';

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

export default function KategorieChips({ kategorieIds, className, link, onDelete, children, ...props }) {
  const classes = useStyles();
  const kategorien = useKategorien();
  const data = useMemo(
    () =>
      kategorieIds
        .map((id) => kategorien.find((k) => k.id === id))
        .filter(Boolean)
        .sort((a, b) => a.label.localeCompare(b.label)),
    [kategorieIds, kategorien]
  );

  return (
    <div className={`${classes.root} ${className || ''}`} {...props}>
      {data.map((kategorie) => (
        <Chip
          key={kategorie.id}
          label={kategorie.label}
          className={classes.chip}
          component={link && Link}
          to={link && `/rezepte?kategorien=${kategorie.id}`}
          clickable={link ? true : undefined}
          onDelete={onDelete && (() => onDelete(kategorie.id))}
        />
      ))}
      {children}
    </div>
  );
}
