import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CacheNotification from './CacheNotification';
import DarkModeButton from './DarkModeButton';
import UpdateNotification from './UpdateNotification';
import UserProfileButton from './UserProfileButton';

const useStyles = makeStyles(({ breakpoints, mixins, shadows, spacing }) => ({
  wrapper: {
    [breakpoints.up('lg')]: {
      width: breakpoints.values.lg - spacing(8),
      margin: `${spacing(4)}px auto 0`,
      boxShadow: shadows[4],
      position: 'relative',
    },
  },
  gutter: {
    ...mixins.gutters(),
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
  actions: {
    marginLeft: 'auto',
  },
}));

export default function Layout({ title, back, gutter, children }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <title>{title ? `${title} - Rezepte` : 'Rezepte'}</title>
      </Helmet>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {back && (
            <IconButton edge="start" color="inherit" component={Link} to={back}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6">{title || 'Rezepte'}</Typography>
          <div className={classes.actions}>
            <DarkModeButton />
            <UserProfileButton />
          </div>
        </Toolbar>
      </AppBar>
      <main className={gutter && classes.gutter}>{children}</main>
      <CacheNotification />
      <UpdateNotification />
    </div>
  );
}
