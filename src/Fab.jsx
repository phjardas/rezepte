import { Fab as MaterialFab } from "@mui/material";

export default function Fab({ ...props }) {
  return (
    <MaterialFab
      color="primary"
      sx={{
        position: { xs: "fixed", lg: "absolute" },
        bottom: "calc(var(--mui-spacing) * 2)",
        right: "calc(var(--mui-spacing) * 2)",
      }}
      {...props}
    />
  );
}
