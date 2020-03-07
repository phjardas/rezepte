import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CacheNotification from './CacheNotification';
import UpdateNotification from './UpdateNotification';
import UserProfileButton from './UserProfileButton';

const useStyles = makeStyles(({ mixins, spacing }) => ({
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
    <>
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
            <UserProfileButton />
          </div>
        </Toolbar>
      </AppBar>
      <main className={gutter && classes.gutter}>{children}</main>
      <CacheNotification />
      <UpdateNotification />
    </>
  );
}
