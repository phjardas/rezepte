import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import UserProfileButton from "./UserProfileButton";

export default function Layout({ title, back, gutter, children }) {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {back && (
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to={back}
              size="large"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="h1" noWrap>
            {title || "Rezepte"}
          </Typography>
          <Box sx={{ ml: "auto", pl: 1 }}>
            <UserProfileButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ py: gutter ? 2 : undefined, pb: 12 }}>
        {children}
      </Container>
    </>
  );
}
