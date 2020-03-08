import React from 'react';
import { useParams } from 'react-router';
import { useRezept } from '../../data';
import ErrorMessage from '../../ErrorMessage';
import Layout from '../../Layout';
import Loading from '../../Loading';
import RezeptForm from './RezeptForm';

export default function RezeptBearbeiten() {
  const { id } = useParams();
  const [rezept, loading, error] = useRezept(id);

  return (
    <Layout title={rezept && rezept.title} gutter back="/rezepte">
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !rezept && <ErrorMessage message="Rezept nicht gefunden" />}
      {rezept && <RezeptForm rezept={rezept} />}
    </Layout>
  );
}
