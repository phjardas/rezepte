import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";

// Repeating 6-tile pattern that fills 4 rows of a 2-column grid without gaps.
const pattern = [
  { rows: 2, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
];

export function Quilt({ children }) {
  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <ImageList
      variant="quilted"
      cols={md ? 4 : sm ? 3 : 2}
      rowHeight={md ? 220 : 170}
      gap={8}
      sx={{ m: 0, gridAutoFlow: "dense" }}
    >
      {children}
    </ImageList>
  );
}

export function QuiltItem({ index, ...props }) {
  return <ImageListItem {...pattern[index % pattern.length]} {...props} />;
}
