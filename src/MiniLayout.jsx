import { Box, Paper, Typography } from "@mui/material";
import Logo from "./Logo";

export default function MiniLayout({ children }) {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: 300,
        // FIXME maxWidth: `calc(100% - ${spacing(4)})`,
        transform: "translateX(-50%) translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        // FIXME zIndex: zIndex.modal,
      }}
    >
      <Logo sx={{ color: "primary.main", fontSize: "7rem" }} />
      <Typography variant="h4" tag="h1">
        Rezepte
      </Typography>
      <Box sx={{ mt: 4 }}>{children}</Box>
    </Paper>
  );
}
