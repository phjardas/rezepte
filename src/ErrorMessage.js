import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import Layout from './Layout';

export default function ErrorMessage({ layout, error, message }) {
  const content = (
    <Card>
      <CardContent>
        <Typography color="error">{message || error.message}</Typography>
      </CardContent>
    </Card>
  );

  return layout ? <Layout gutter>{content}</Layout> : content;
}
