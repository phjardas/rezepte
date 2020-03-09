import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ulid } from 'ulid';
import { useAuth } from '../auth';
import { Firebase, firestore, storage } from '../firebase';
import { useSearch } from './search';
import { materialize } from './utils';

const rezepteColl = firestore.collection('rezepte');

const Context = createContext();

export function RezepteProvider({ children }) {
  const [docs, loading, error] = useCollection(rezepteColl, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const rezepte = useMemo(() => docs && docs.docs.map(materialize), [docs]);
  return <Context.Provider value={[rezepte, loading, error]}>{children}</Context.Provider>;
}

export function useRezepte({ filter = {} } = {}) {
  const filterFn = useRezepteFilter(filter);
  const [docs, loading, error] = useContext(Context);
  const rezepte = useMemo(() => docs && docs.filter(filterFn), [docs, filterFn]);
  return [rezepte, loading, error];
}

function useRezepteFilter({ kategorien, search }) {
  const index = useSearch();
  const ids = useMemo(() => search && index && index.search(search), [search, index]);

  return useMemo(() => {
    return (rezept) => {
      if (ids && !ids.includes(rezept.id)) return false;
      if (kategorien && kategorien.length && !kategorien.some((kat) => rezept.kategorien && rezept.kategorien[kat])) return false;
      return true;
    };
  }, [kategorien, ids]);
}

export function useRezept(id) {
  const [rezepte, loading, error] = useRezepte();
  return [rezepte && rezepte.find((rezept) => rezept.id === id), loading, error];
}

export function useSaveRezept(id) {
  const { user } = useAuth();

  return useCallback(
    async (values, images) => {
      const ref = id ? rezepteColl.doc(id) : rezepteColl.doc();
      const savedImages = await Promise.all(images.map((img) => (img.src ? img : saveImage(img, ref.id))));
      const rezept = { ...values, images: savedImages, owner: user.id, updatedAt: Firebase.firestore.FieldValue.serverTimestamp() };
      await ref.set(rezept);
      return ref;
    },
    [id, user]
  );
}

async function saveImage(file, rezeptId) {
  const size = await getImageSize(file);
  const imageId = ulid();
  const ref = storage
    .ref()
    .child('rezepte')
    .child(rezeptId)
    .child(imageId);
  await ref.put(file, { cacheControl: 'max-age=31536000' });
  const src = await ref.getDownloadURL();
  return { src, ...size };
}

function getImageSize(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => resolve({ width: img.width, height: img.height });
    };
    reader.readAsDataURL(file);
  });
}
