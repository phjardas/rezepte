import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import Layout from './Layout';

const showStacks = process.env.NODE_ENV === 'development';

export default function ErrorMessage({ layout, error, message }) {
  if (showStacks) console.error(error);

  const content = (
    <Card>
      <CardContent>
        <Typography variant="h5" component="p" color="error">
          {message || error.message}
        </Typography>
        {showStacks && error && error.stack && <pre>{error.stack}</pre>}
      </CardContent>
    </Card>
  );

  return layout ? <Layout gutter>{content}</Layout> : content;
}
