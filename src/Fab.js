import { Fab as MaterialFab, makeStyles, useTheme, Zoom } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(({ breakpoints, spacing, zIndex }) => ({
  fab: {
    position: 'fixed',
    bottom: spacing(3),
    right: spacing(4),
    zIndex: zIndex.speedDial,
    [breakpoints.up('lg')]: {
      position: 'absolute',
    },
  },
}));

export default function Fab({ className, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom in={true} timeout={transitionDuration} unmountOnExit>
      <MaterialFab color="primary" className={`${classes.fab} ${className || ''}`} {...props} />
    </Zoom>
  );
}
