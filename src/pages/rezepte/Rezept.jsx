import { Edit as EditIcon } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth";
import { useRezept } from "../../data";
import ErrorMessage from "../../ErrorMessage";
import Fab from "../../Fab";
import { Grid, GridTile } from "../../Grid";
import KategorieChips from "../../KategorieChips";
import Layout from "../../Layout";
import Loading from "../../Loading";
import UserChip from "../../UserChip";

export default function RezeptPage() {
  const { id } = useParams();
  const [rezept, loading, error] = useRezept(id);

  return (
    <Layout title={rezept && rezept.title} gutter back="/rezepte">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !rezept && <ErrorMessage message="Rezept nicht gefunden" />}
      {rezept && <Rezept rezept={rezept} />}
    </Layout>
  );
}

function Rezept({ rezept }) {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography style={{ whiteSpace: "pre-line" }}>{rezept.text}</Typography>
      {rezept.images && rezept.images.length > 0 && (
        <Grid>
          {rezept.images.map((image) => (
            <GridTile
              key={image.src}
              style={{ backgroundImage: `url(${image.src})` }}
            />
          ))}
        </Grid>
      )}
      <Card>
        <CardContent>
          <Typography gutterBottom component="div">
            von <UserChip id={rezept.owner} />
          </Typography>
          {rezept.updatedAt && (
            <Typography variant="caption" component="p" gutterBottom>
              Aktualisiert:{" "}
              {new Date(rezept.updatedAt.seconds * 1000).toLocaleString()}
            </Typography>
          )}
          {rezept.kategorien && (
            <KategorieChips
              kategorieIds={Object.keys(rezept.kategorien)}
              link
            />
          )}
        </CardContent>
      </Card>
      {user.id === rezept.owner && (
        <Fab
          color="secondary"
          component={Link}
          to={`/rezepte/${rezept.id}/bearbeiten`}
        >
          <EditIcon />
        </Fab>
      )}
    </Box>
  );
}
