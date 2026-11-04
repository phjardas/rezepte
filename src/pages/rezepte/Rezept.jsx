import { Edit as EditIcon } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { useAuth } from "../../auth";
import { useRezept } from "../../data";
import ErrorMessage from "../../ErrorMessage";
import Fab from "../../Fab";
import KategorieChips from "../../KategorieChips";
import Layout from "../../Layout";
import Loading from "../../Loading";
import { Quilt, QuiltItem } from "../../Quilt";
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
      {rezept.images && rezept.images.length > 0 && (
        <Quilt>
          {rezept.images.map((image, i) => (
            <QuiltItem
              key={image.src}
              index={i}
              component="a"
              href={image.src}
              target="_blank"
              rel="noopener"
            >
              <img src={image.src} alt="" loading="lazy" />
            </QuiltItem>
          ))}
        </Quilt>
      )}
      {rezept.text && (
        <Card>
          <CardContent>
            <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
              {rezept.text}
            </Typography>
          </CardContent>
        </Card>
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
          component={Link}
          aria-label="Rezept bearbeiten"
          to={`/rezepte/${rezept.id}/bearbeiten`}
        >
          <EditIcon />
        </Fab>
      )}
    </Box>
  );
}
