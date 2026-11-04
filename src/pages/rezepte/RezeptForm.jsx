import {
  Button,
  CardActions,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { object, string } from "yup";
import { deleteRezept, useSaveRezept } from "../../data";
import Images from "./Images";
import Kategorien from "./Kategorien";

const defaultValues = {
  title: "",
  text: "",
  kategorieIds: [],
};

const schema = object({
  title: string().required("Dies ist ein Pflichtfeld"),
  text: string().required("Dies ist ein Pflichtfeld"),
});

export default function RezeptForm({ rezept }) {
  const id = rezept && rezept.id;

  const saveRezept = useSaveRezept(rezept ? rezept.id : undefined);
  const navigate = useNavigate();
  const initialValues = useMemo(
    () => ({
      ...defaultValues,
      ...rezept,
      kategorieIds:
        rezept && rezept.kategorien ? Object.keys(rezept.kategorien) : [],
    }),
    [rezept],
  );
  const [images, setImages] = useState((rezept && rezept.images) || []);

  const onSubmit = useCallback(
    async ({ kategorieIds, ...values }, { setSubmitting, setStatus }) => {
      try {
        const data = {
          ...values,
          kategorien: kategorieIds.reduce((a, b) => ({ ...a, [b]: true }), {}),
        };
        const res = await saveRezept(data, images);
        navigate(`/rezepte/${res.id}`);
      } catch (error) {
        setStatus(error);
        setSubmitting(false);
      }
    },
    [saveRezept, navigate, images],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ dirty, isValid, isSubmitting, status, values }) => (
        <Form>
          {status && (
            <Typography color="error" gutterBottom>
              {status.message}
            </Typography>
          )}
          <Field name="title">
            {({ field, meta }) => (
              <TextField
                label="Überschrift"
                variant="outlined"
                margin="normal"
                required
                {...field}
                error={Boolean(meta.error)}
                helperText={meta.error}
                fullWidth
              />
            )}
          </Field>
          <Field name="text">
            {({ field, meta }) => (
              <TextField
                label="Anleitung"
                variant="outlined"
                margin="normal"
                required
                {...field}
                error={Boolean(meta.error)}
                helperText={meta.error}
                fullWidth
                multiline
                rows={10}
              />
            )}
          </Field>
          <Kategorien values={values.kategorieIds} />
          <Images images={images} setImages={setImages} />
          <CardActions sx={{ mt: 2 }}>
            {rezept && <DeleteButton rezept={rezept} />}
            <Button
              type="reset"
              variant="text"
              color="inherit"
              component={Link}
              to={id ? `/rezepte/${id}` : "/rezepte"}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={!dirty || !isValid || isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={"1em"} />}
            >
              Rezept speichern
            </Button>
          </CardActions>
        </Form>
      )}
    </Formik>
  );
}

function DeleteButton({ rezept }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState();

  const onDelete = async () => {
    setDeleting(true);
    setError(undefined);
    try {
      await deleteRezept(rezept.id);
      navigate("/rezepte", { replace: true });
    } catch (e) {
      setError(e);
      setDeleting(false);
    }
  };

  return (
    <>
      <Button color="error" onClick={() => setOpen(true)} sx={{ mr: "auto" }}>
        Löschen
      </Button>
      <Dialog open={open} onClose={() => !deleting && setOpen(false)}>
        <DialogTitle>Rezept löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            „{rezept.title}“ wird mit allen Bildern endgültig gelöscht.
          </DialogContentText>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Abbrechen
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={onDelete}
            disabled={deleting}
            startIcon={deleting && <CircularProgress size="1em" />}
          >
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
