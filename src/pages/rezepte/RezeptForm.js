import { Button, CircularProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useSaveRezept } from '../../data';
import Images from './Images';

const defaultValues = {
  title: '',
  text: '',
};

const schema = object({
  title: string().required('Dies ist ein Pflichtfeld'),
  text: string().required('Dies ist ein Pflichtfeld'),
});

const useStyles = makeStyles(({ palette, spacing }) => ({
  actions: {
    marginTop: spacing(2),
  },
  cancelButton: {
    color: palette.text.secondary,
    marginLeft: spacing(1),
  },
}));

export default function RezeptForm({ rezept }) {
  const id = rezept && rezept.id;
  const classes = useStyles();
  const saveRezept = useSaveRezept(rezept ? rezept.id : undefined);
  const navigate = useNavigate();
  const initialValues = useMemo(() => ({ ...defaultValues, ...rezept }), [rezept]);
  const [images, setImages] = useState((rezept && rezept.images) || []);

  const onSubmit = useCallback(
    async (values, { setSubmitting, setStatus }) => {
      try {
        const res = await saveRezept(values, images);
        navigate(`/rezepte/${res.id}`);
      } catch (error) {
        setStatus(error);
        setSubmitting(false);
      }
    },
    [saveRezept, navigate, images]
  );

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ dirty, isValid, isSubmitting, status }) => (
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
          <Images images={images} setImages={setImages} />
          <div className={classes.actions}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={!dirty || !isValid || isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={'1em'} />}
            >
              Rezept speichern
            </Button>
            <Button type="reset" variant="text" component={Link} to={id ? `/rezepte/${id}` : '/rezepte'} className={classes.cancelButton}>
              Abbrechen
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
