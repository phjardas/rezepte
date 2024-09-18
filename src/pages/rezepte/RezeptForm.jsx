import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useSaveRezept } from "../../data";
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
    [rezept]
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
    [saveRezept, navigate, images]
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
