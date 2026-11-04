import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { Link } from "react-router";
import UserProfileButton from "./UserProfileButton";

// Transparent bar drawn over a full-width header photo.
const overlaySx = {
  bgcolor: "transparent",
  backgroundImage: "linear-gradient(rgb(0 0 0 / 0.45), transparent)",
  backdropFilter: "none",
  borderBottom: "none",
  boxShadow: "none",
  color: "common.white",
};

export default function Layout({ title, back, gutter, hero, children }) {
  // ponytail: fixed threshold, roughly half the header photo on a phone.
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 160,
  });
  const overlay = hero && !scrolled;

  return (
    <>
      <AppBar
        position={hero ? "fixed" : "sticky"}
        sx={{
          transition: "background-color .2s, color .2s",
          ...(overlay && overlaySx),
        }}
      >
        <Toolbar>
          {back && (
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to={back}
              size="large"
              aria-label="Zurück"
              sx={
                overlay
                  ? {
                      bgcolor: "rgb(0 0 0 / 0.3)",
                      "&:hover": { bgcolor: "rgb(0 0 0 / 0.45)" },
                    }
                  : undefined
              }
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={hero ? "div" : "h1"}
            noWrap
            sx={{
              ml: back ? 1 : 0,
              opacity: overlay ? 0 : 1,
              transition: "opacity .2s",
            }}
          >
            {title || "Rezepte"}
          </Typography>
          <Box sx={{ ml: "auto", pl: 1 }}>
            <UserProfileButton />
          </Box>
        </Toolbar>
      </AppBar>
      {hero ? (
        <main>{children}</main>
      ) : (
        <Container component="main" sx={{ py: gutter ? 2 : undefined, pb: 12 }}>
          {children}
        </Container>
      )}
    </>
  );
}
