import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useState } from "react";
import { firebase } from "./firebase";

const auth = getAuth(firebase);

const providers = [
  {
    id: "google",
    label: "Google",
    provider: new GoogleAuthProvider(),
  },
];

export default function SignIn({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = useCallback(
    ({ provider }) =>
      async () => {
        try {
          setLoading(true);
          setError(null);
          await signInWithPopup(auth, provider);
          onSuccess && onSuccess();
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      },
    [setLoading, setError, onSuccess]
  );

  if (loading) return <CircularProgress color="primary" />;

  return (
    <>
      {error && (
        <Typography color="error" gutterBottom>
          {error.message}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {providers.map((provider) => (
          <Button
            key={provider.id}
            color="secondary"
            variant="contained"
            fullWidth
            onClick={signIn(provider)}
          >
            Mit {provider.label} anmelden
          </Button>
        ))}
      </Box>
    </>
  );
}
