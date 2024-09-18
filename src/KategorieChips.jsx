import { Box, Chip } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useKategorien } from "./data";

export default function KategorieChips({
  kategorieIds,
  link,
  onDelete,
  children,
}) {
  const kategorien = useKategorien();
  const data = useMemo(
    () =>
      kategorieIds
        .map((id) => kategorien.find((k) => k.id === id))
        .filter(Boolean)
        .sort((a, b) => a.label.localeCompare(b.label)),
    [kategorieIds, kategorien]
  );

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}
    >
      {data.map((kategorie) => (
        <Chip
          key={kategorie.id}
          label={kategorie.label}
          component={link && Link}
          to={link && `/rezepte?kategorien=${kategorie.id}`}
          clickable={link ? true : undefined}
          onDelete={onDelete && (() => onDelete(kategorie.id))}
        />
      ))}
      {children}
    </Box>
  );
}
