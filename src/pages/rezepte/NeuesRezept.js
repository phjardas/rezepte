import React from 'react';
import Layout from '../../Layout';
import RezeptForm from './RezeptForm';

export default function NeuesRezept() {
  return (
    <Layout title="Neues Rezept" back="/rezepte" gutter>
      <RezeptForm />
    </Layout>
  );
}
