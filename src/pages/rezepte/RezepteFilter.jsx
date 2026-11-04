import { Search as SearchIcon } from "@mui/icons-material";
import { Box, Chip, InputAdornment, TextField } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useKategorien } from "../../data";

export default function RezepteFilter({ filter, setFilter }) {
  const setSearch = useCallback(
    (search) => setFilter((f) => ({ ...f, search })),
    [setFilter],
  );
  const kategorien = useKategorien();
  const sortedKategorien = useMemo(
    () => [...kategorien].sort((a, b) => a.label.localeCompare(b.label)),
    [kategorien],
  );
  const toggleKategorie = useCallback(
    (id) =>
      setFilter((f) => ({
        ...f,
        kategorien: f.kategorien.includes(id)
          ? f.kategorien.filter((k) => k !== id)
          : [...f.kategorien, id],
      })),
    [setFilter],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        type="search"
        placeholder="Rezepte durchsuchen"
        value={filter.search || ""}
        onChange={(e) => setSearch(e.currentTarget.value)}
        variant="outlined"
        slotProps={{
          htmlInput: { "aria-label": "Rezepte durchsuchen" },
          input: {
            sx: {
              "--mui-shape-borderRadius": "999px",
              bgcolor: "background.paper",
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      {/* Single scrolling row on phones, wrapped on wider screens. */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 1.5,
          mx: { xs: -2, sm: 0 },
          px: { xs: 2, sm: 0 },
          overflowX: { xs: "auto", sm: "visible" },
          flexWrap: { xs: "nowrap", sm: "wrap" },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {sortedKategorien.map((kategorie) => {
          const active = filter.kategorien.includes(kategorie.id);
          return (
            <Chip
              key={kategorie.id}
              label={kategorie.label}
              color={active ? "primary" : "default"}
              variant={active ? "filled" : "outlined"}
              onClick={() => toggleKategorie(kategorie.id)}
              onDelete={
                active ? () => toggleKategorie(kategorie.id) : undefined
              }
              sx={{
                flexShrink: 0,
                bgcolor: active ? undefined : "background.paper",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
