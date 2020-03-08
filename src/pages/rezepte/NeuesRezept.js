import { Button, CircularProgress, makeStyles, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useCreateRezept } from '../../data';
import Layout from '../../Layout';

const initialValues = {
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

export default function NeuesRezept() {
  const classes = useStyles();
  const createRezept = useCreateRezept();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (values, { setSubmitting, setStatus }) => {
      try {
        const { id } = await createRezept(values);
        navigate(`/rezepte/${id}`);
      } catch (error) {
        setStatus(error);
        setSubmitting(false);
      }
    },
    [createRezept, navigate]
  );

  return (
    <Layout title="Neues Rezept" back="/rezepte" gutter>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ dirty, isValid, isSubmitting }) => (
          <Form>
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
            <div className={classes.actions}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={!dirty || !isValid || isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={'1em'} />}
              >
                Neues Rezept speichern
              </Button>
              <Button type="reset" variant="text" component={Link} to="/rezepte" className={classes.cancelButton}>
                Abbrechen
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
