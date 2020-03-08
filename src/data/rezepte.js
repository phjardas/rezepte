import React, { createContext } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { materialize } from './utils';

const Context = createContext();

export function RezepteProvider({ children }) {
  const { user } = useAuth();
  const [docs, loading, error] = useCollection(firestore.collection('cars').where(`users.${user.id}`, '==', true), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const cars = docs && docs.docs.map(materialize);
  return <Context.Provider value={[cars, loading, error]}>{children}</Context.Provider>;
}

export function useRezepte() {
  const [docs, loading, error] = useCollection(firestore.collection('rezepte').orderBy('title'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const rezepte = docs && docs.docs.map(materialize);
  return [rezepte, loading, error];
}

export function useRezept(id) {
  const [doc, loading, error] = useDocument(firestore.collection('rezepte').doc(id), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return [materialize(doc), loading, error];
}

export function useCreateRezept() {
  const { user } = useAuth();

  return async (values) => {
    const rezept = { ...values, owner: user.id };
    const ref = await firestore.collection('rezepte').add(rezept);
    console.log('ref:', ref);
    return ref;
  };
}
