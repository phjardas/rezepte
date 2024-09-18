import { Add as AddIcon } from "@mui/icons-material";
import { ImageListItemBar } from "@mui/material";
import { useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useKategorien, useRezepte } from "../../data";
import ErrorMessage from "../../ErrorMessage";
import Fab from "../../Fab";
import { Grid, GridTile } from "../../Grid";
import Layout from "../../Layout";
import LinkBehavior from "../../LinkBehavior";
import Loading from "../../Loading";
import RezepteFilter from "./RezepteFilter";

function useFilter() {
  const location = useLocation();
  const navigate = useNavigate();
  const filter = useMemo(() => {
    const search = new URLSearchParams(window.location.search);
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
      <Fab color="secondary" component={Link} to="/rezepte/_neu">
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
    <Grid>
      {sorted.map((rezept) => (
        <GridTile
          key={rezept.id}
          component={LinkBehavior}
          to={`/rezepte/${rezept.id}`}
          style={{
            backgroundImage:
              rezept.images && rezept.images.length > 0
                ? `url(${rezept.images[0].src})`
                : undefined,
          }}
        >
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
        </GridTile>
      ))}
    </Grid>
  );
}
