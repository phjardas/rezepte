import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './auth';
import { CacheProvider } from './cache';
import { KategorienProvider } from './data';
import { ThemeProvider } from './theme';

export default function Providers({ children }) {
  return (
    <CacheProvider>
      <ThemeProvider>
        <HelmetProvider>
          <AuthProvider>
            <KategorienProvider>{children}</KategorienProvider>
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
