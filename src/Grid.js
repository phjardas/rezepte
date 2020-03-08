import { makeStyles } from '@material-ui/core';
import React from 'react';

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

export function Grid({ className, children }) {
  const classes = useStyles();
  return (
    <div className={`${classes.grid} ${className || ''}`}>
      <div className={classes.sizingTile} />
      {children}
    </div>
  );
}

export function GridTile({ component: Comp = 'div', className, ...props }) {
  const classes = useStyles();
  return <Comp {...props} className={`${classes.tile} ${className || ''}`} />;
}
