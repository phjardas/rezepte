import { Edit as EditIcon } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { useAuth } from "../../auth";
import { useRezept } from "../../data";
import ErrorMessage from "../../ErrorMessage";
import Fab from "../../Fab";
import KategorieChips from "../../KategorieChips";
import Layout from "../../Layout";
import Loading from "../../Loading";
import UserChip from "../../UserChip";

export default function RezeptPage() {
  const { id } = useParams();
  const [rezept, loading, error] = useRezept(id);
  const images = rezept?.images ?? [];
  const hero = images.length > 0;

  return (
    <Layout title={rezept?.title} gutter={!hero} hero={hero} back="/rezepte">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !rezept && <ErrorMessage message="Rezept nicht gefunden" />}
      {rezept &&
        (hero ? <WithHero rezept={rezept} /> : <Details rezept={rezept} />)}
    </Layout>
  );
}

function WithHero({ rezept }) {
  const [first, ...rest] = rezept.images;

  return (
    <>
      <Box
        component="a"
        href={first.src}
        target="_blank"
        rel="noopener"
        sx={{
          display: "block",
          height: { xs: "min(75vw, 60vh)", md: "50vh" },
          bgcolor: "divider",
        }}
      >
        <Box
          component="img"
          src={first.src}
          alt=""
          sx={{ width: 1, height: 1, objectFit: "cover", display: "block" }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          mt: "-28px",
          borderRadius: "28px 28px 0 0",
          bgcolor: "background.default",
          minHeight: "60vh",
        }}
      >
        <Container maxWidth="md" sx={{ pt: 3, pb: 12 }}>
          <Details rezept={rezept} images={rest} />
        </Container>
      </Box>
    </>
  );
}

function Details({ rezept, images = [] }) {
  const { user } = useAuth();
  const hero = rezept.images?.length > 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" component={hero ? "h1" : "h2"}>
        {rezept.title}
      </Typography>
      {rezept.kategorien && (
        <KategorieChips kategorieIds={Object.keys(rezept.kategorien)} link />
      )}
      <Typography
        variant="body2"
        color="text.secondary"
        component="div"
        sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}
      >
        von <UserChip id={rezept.owner} />
        {rezept.updatedAt && (
          <span>
            · {new Date(rezept.updatedAt.seconds * 1000).toLocaleDateString()}
          </span>
        )}
      </Typography>
      {images.length > 0 && <Thumbnails images={images} />}
      {rezept.text && (
        <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
          {rezept.text}
        </Typography>
      )}
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

function Thumbnails({ images }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        mx: { xs: -2, sm: 0 },
        px: { xs: 2, sm: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {images.map((image) => (
        <Box
          key={image.src}
          component="a"
          href={image.src}
          target="_blank"
          rel="noopener"
          sx={{
            flexShrink: 0,
            width: 120,
            height: 120,
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={image.src}
            alt=""
            loading="lazy"
            sx={{ width: 1, height: 1, objectFit: "cover", display: "block" }}
          />
        </Box>
      ))}
    </Box>
  );
}
