import { Box } from "@mui/material";

export function Grid({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridAutoRows: "1fr",
        gridTemplateColumns: {
          sm: `repeat(auto-fill, minmax(45%, 1fr))`,
          md: `repeat(auto-fill, minmax(30%, 1fr))`,
          lg: `repeat(auto-fill, minmax(17%, 1fr))`,
        },
      }}
    >
      <Box
        sx={{
          width: 0,
          paddingBottom: "100%",
          gridRow: "1 / 1",
          gridColumn: "1 / 1",
        }}
      />
      {children}
    </Box>
  );
}

export function GridTile(props) {
  return (
    <Box
      {...props}
      sx={{
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        textTransform: "none",
        fontWeight: "normal",
        textAlign: "left",
        p: 0,
        "&:nth-of-type(2)": {
          gridRow: "1 / 1",
          gridColumn: "1 / 1",
        },
      }}
    />
  );
}
