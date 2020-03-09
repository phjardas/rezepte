import { useCallback, useMemo } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { ulid } from 'ulid';
import { useAuth } from '../auth';
import { firestore, storage, Firebase } from '../firebase';
import { materialize } from './utils';

const rezepteColl = firestore.collection('rezepte');

export function useRezepte({ filter = {} } = {}) {
  const query = useMemo(() => {
    let q = rezepteColl;
    if (filter.kategorien) filter.kategorien.forEach((kat) => (q = q.where(`kategorien.${kat}`, '==', true)));
    return q;
  }, [filter]);

  const [docs, loading, error] = useCollection(query, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const rezepte = useMemo(() => docs && docs.docs.map(materialize), [docs]);
  return [rezepte, loading, error];
}

export function useRezept(id) {
  const [doc, loading, error] = useDocument(rezepteColl.doc(id), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return [materialize(doc), loading, error];
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
