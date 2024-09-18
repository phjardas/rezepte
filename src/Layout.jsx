import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserProfileButton from "./UserProfileButton";

export default function Layout({ title, back, gutter, children }) {
  return (
    <>
      <AppBar position="sticky" color="primary">
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
          <Typography variant="h6">{title || "Rezepte"}</Typography>
          <Box sx={{ ml: "auto" }}>
            <UserProfileButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ py: gutter ? 2 : undefined }}>
        {children}
      </Container>
    </>
  );
}
