import { ListItem } from '@material-ui/core';
import React, { forwardRef, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function ListItemLink({ to, children }) {
  const renderLink = useMemo(() => forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />), [to]);

  return (
    <li>
      <ListItem button component={renderLink}>
        {children}
      </ListItem>
    </li>
  );
}
