import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { auth, Firebase } from './firebase';

const providers = [
  {
    id: 'google',
    label: 'Google',
    provider: new Firebase.auth.GoogleAuthProvider(),
  },
];

export default function SignIn({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = useCallback(
    ({ provider }) => async () => {
      try {
        setLoading(true);
        setError(null);
        await auth.signInWithPopup(provider);
        onSuccess && onSuccess();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, onSuccess]
  );

  if (loading) return <CircularProgress color="primary" />;

  return (
    <>
      {error && (
        <Typography color="error" gutterBottom>
          {error.message}
        </Typography>
      )}
      <Grid container spacing={2}>
        {providers.map((provider) => (
          <Grid item xs={12} key={provider.id}>
            <Button color="secondary" variant="contained" fullWidth onClick={signIn(provider)}>
              Mit {provider.label} anmelden
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
