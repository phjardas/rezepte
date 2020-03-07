import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from '../Loading';
import Redirect from '../Redirect';
import NotFound from './404';

const SignIn = lazy(() => import('./signin'));
const Rezepte = lazy(() => import('./rezepte'));

export default function Pages() {
  return (
    <Suspense fallback={<Loading layout={true} />}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/rezepte" element={<Rezepte />} />
          <Route path="/" element={<Redirect to="/rezepte" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
