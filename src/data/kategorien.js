import React, { createContext, useContext, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import ErrorMessage from '../ErrorMessage';
import { firestore } from '../firebase';
import Loading from '../Loading';
import { materialize } from './utils';

const Context = createContext();
const collection = firestore.collection('kategorien');

export function KategorienProvider({ children }) {
  const [data, loading, error] = useCollection(collection);
  const context = useMemo(() => data && data.docs.map(materialize), [data]);

  if (error) return <ErrorMessage error={error} layout />;
  if (loading) return <Loading layout />;

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useKategorien() {
  return useContext(Context);
}
