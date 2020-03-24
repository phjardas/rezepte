import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { KategorienProvider, RezepteProvider } from '../../data';
import { SearchProvider } from '../../data/search';

const Rezept = lazy(() => import('./Rezept'));
const Rezepte = lazy(() => import('./Rezepte'));
const NeuesRezept = lazy(() => import('./NeuesRezept'));
const RezeptBearbeiten = lazy(() => import('./RezeptBearbeiten'));

export default function Rezepts() {
  return (
    <KategorienProvider>
      <RezepteProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Rezepte />} />
            <Route path="/_neu" element={<NeuesRezept />} />
            <Route path="/:id" element={<Rezept />} />
            <Route path="/:id/bearbeiten" element={<RezeptBearbeiten />} />
          </Routes>
        </SearchProvider>
      </RezepteProvider>
    </KategorienProvider>
  );
}
