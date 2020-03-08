import React, { lazy } from 'react';
import { Routes } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute';

const Rezept = lazy(() => import('./Rezept'));
const Rezepte = lazy(() => import('./Rezepte'));
const NeuesRezept = lazy(() => import('./NeuesRezept'));

export default function Rezepts() {
  return (
    <Routes>
      <ProtectedRoute path="/" element={<Rezepte />} />
      <ProtectedRoute path="/_neu" element={<NeuesRezept />} />
      <ProtectedRoute path="/:id/*" element={<Rezept />} />
    </Routes>
  );
}
