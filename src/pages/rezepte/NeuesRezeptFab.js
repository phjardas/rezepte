import { Add as AddIcon } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '../../Fab';

export default function NeuesRezeptFab() {
  return (
    <Fab color="secondary" component={Link} to="/rezepte/_neu">
      <AddIcon />
    </Fab>
  );
}
