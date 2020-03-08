import { GridListTile } from '@material-ui/core';
import React, { forwardRef, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function GridListTileLink({ to, children, ...props }) {
  const renderLink = useMemo(() => forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />), [to]);

  return (
    <GridListTile component={renderLink} {...props}>
      {children}
    </GridListTile>
  );
}
