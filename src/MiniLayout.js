import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Logo from './Logo';

const useStyles = makeStyles(({ spacing, palette, zIndex }) => ({
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    maxWidth: `calc(100% - ${spacing(4)}px)`,
    transform: 'translateX(-50%) translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(4),
    zIndex: zIndex.modal,
  },
  logo: {
    color: palette.primary.main,
    fontSize: '7rem',
  },
  main: {
    marginTop: spacing(4),
  },
}));

export default function MiniLayout({ children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.wrapper}>
      <Logo className={classes.logo} />
      <Typography variant="h4" tag="h1">
        Rezepte
      </Typography>
      <div className={classes.main}>{children}</div>
    </Paper>
  );
}
