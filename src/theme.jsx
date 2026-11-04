import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

const headingFont = '"Fraunces", Georgia, serif';

const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
      ...Object.fromEntries(
        ["h1", "h2", "h3", "h4", "h5", "h6"].map((h) => [
          h,
          { fontFamily: headingFont, fontWeight: 600 },
        ])
      ),
    },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: "#b4441f" },
          secondary: { main: "#5b6b3a" },
          background: {
            default: "#fbf6ef",
            paper: "#ffffff",
          },
          text: {
            primary: "#2b211c",
            secondary: "#6f625a",
          },
          divider: "#eadfd3",
        },
      },
    },
    components: {
      MuiAlert: {
        defaultProps: {
          variant: "filled",
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
          color: "inherit",
        },
        styleOverrides: {
          root: {
            backgroundColor: "rgb(251 246 239 / 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--mui-palette-divider)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 6px 20px rgb(180 68 31 / 0.35)",
          },
        },
      },
      MuiImageListItem: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            overflow: "hidden",
          },
        },
      },
      MuiImageListItemBar: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(to top, rgb(0 0 0 / 0.75), rgb(0 0 0 / 0.35) 60%, transparent)",
            paddingTop: 24,
          },
          title: {
            fontFamily: headingFont,
            fontWeight: 600,
            fontSize: "1.05rem",
            whiteSpace: "normal",
            lineHeight: 1.25,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "1rem",
            padding: "0 24px",
            minHeight: 40,
            borderRadius: 20,
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            border: "1px solid var(--mui-palette-divider)",
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            justifyContent: "flex-end",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "0 24px 24px",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: 24,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: "24px 24px 16px",
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "--mui-shape-borderRadius": "4px",
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiFormControl: {
        defaultProps: {
          variant: "filled",
          fullWidth: true,
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "filled",
          fullWidth: true,
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },

      MuiSelect: {
        defaultProps: {
          variant: "filled",
          fullWidth: true,
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  })
);

export function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
