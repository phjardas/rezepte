import { Add as AddIcon } from "@mui/icons-material";
import { Box, ImageListItemBar } from "@mui/material";
import { useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useKategorien, useRezepte } from "../../data";
import ErrorMessage from "../../ErrorMessage";
import Fab from "../../Fab";
import Layout from "../../Layout";
import Loading from "../../Loading";
import Logo from "../../Logo";
import { Quilt, QuiltItem } from "../../Quilt";
import RezepteFilter from "./RezepteFilter";

function useFilter() {
  const location = useLocation();
  const navigate = useNavigate();
  const filter = useMemo(() => {
    const search = new URLSearchParams(location.search);
    return {
      search: search.get("search"),
      kategorien: search.get("kategorien")?.split(",") ?? [],
    };
  }, [location.search]);

  const setFilter = useCallback(
    (updater) => {
      const nextFilter =
        typeof updater === "function" ? updater(filter) : updater;
      const params = new URLSearchParams();
      if (nextFilter.search) params.set("search", nextFilter.search);
      if (nextFilter.kategorien && nextFilter.kategorien.length) {
        params.set("kategorien", nextFilter.kategorien.join(","));
      }

      navigate(`${location.pathname}?${params.toString()}`);
    },
    [filter, navigate, location]
  );

  return [filter, setFilter];
}

export default function Rezepte() {
  const [filter, setFilter] = useFilter();
  const [rezepte, loading, error] = useRezepte({ filter });

  return (
    <Layout gutter>
      <RezepteFilter filter={filter} setFilter={setFilter} />
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {rezepte && <RezepteList rezepte={rezepte} />}
      <Fab component={Link} to="/rezepte/_neu" aria-label="Neues Rezept">
        <AddIcon />
      </Fab>
    </Layout>
  );
}

function RezepteList({ rezepte }) {
  const kategorien = useKategorien();
  const sorted = useMemo(
    () => rezepte.toSorted((a, b) => a.title.localeCompare(b.title)),
    [rezepte]
  );

  if (!sorted.length) return <ErrorMessage message="Keine Rezepte gefunden." />;

  return (
    <Quilt>
      {sorted.map((rezept, i) => (
        <QuiltItem
          key={rezept.id}
          index={i}
          component={Link}
          to={`/rezepte/${rezept.id}`}
        >
          {rezept.images?.length > 0 ? (
            <img src={rezept.images[0].src} alt="" loading="lazy" />
          ) : (
            <Placeholder />
          )}
          <ImageListItemBar
            title={rezept.title}
            subtitle={
              rezept.kategorien &&
              Object.keys(rezept.kategorien)
                .map((id) => kategorien.find((k) => k.id === id))
                .filter(Boolean)
                .map((k) => k.label)
                .sort((a, b) => a.localeCompare(b))
                .join(", ")
            }
          />
        </QuiltItem>
      ))}
    </Quilt>
  );
}

function Placeholder() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f3dcc8, #e7c3a6)",
        color: "rgb(180 68 31 / 0.4)",
      }}
    >
      <Logo sx={{ fontSize: "3rem" }} />
    </Box>
  );
}
