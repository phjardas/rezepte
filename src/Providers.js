import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './auth';
import { CacheProvider } from './cache';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './theme';
import { useWakeLock } from './wakelock';

export default function Providers({ children }) {
  useWakeLock();

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <CacheProvider>
          <HelmetProvider>
            <AuthProvider>{children}</AuthProvider>
          </HelmetProvider>
        </CacheProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
