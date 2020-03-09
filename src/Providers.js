import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './auth';
import { CacheProvider } from './cache';
import { KategorienProvider, RezepteProvider } from './data';
import { SearchProvider } from './data/search';
import { ThemeProvider } from './theme';

export default function Providers({ children }) {
  return (
    <CacheProvider>
      <ThemeProvider>
        <HelmetProvider>
          <AuthProvider>
            <KategorienProvider>
              <RezepteProvider>
                <SearchProvider>{children}</SearchProvider>
              </RezepteProvider>
            </KategorienProvider>
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
