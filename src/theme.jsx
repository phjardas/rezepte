import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import { deepOrange, teal } from "@mui/material/colors";

const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    shape: {
      borderRadius: 16,
    },
    colorSchemes: {
      light: {
        palette: {
          primary: teal,
          secondary: deepOrange,
          background: {
            default: "#f5f5f5",
          },
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
