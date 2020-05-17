import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';
import React, { useMemo } from 'react';

export function ThemeProvider({ children }) {
  const theme = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>{children}</Wrapper>
    </MuiThemeProvider>
  );
}

const useStyles = makeStyles(({ palette }) => ({
  '@global': {
    body: {
      background: palette.background.default,
    },
  },
}));

function Wrapper({ children }) {
  useStyles();
  return children;
}

function useTheme() {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
          primary: darkMode ? { main: teal[700] } : teal,
          secondary: darkMode ? { main: deepOrange[700] } : deepOrange,
        },
      }),
    [darkMode]
  );

  if (process.env.NODE_ENV === 'development') {
    console.debug('Theme:', theme);
  }

  return theme;
}
