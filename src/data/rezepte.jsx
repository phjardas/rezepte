import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ulid } from "ulid";
import { useAuth } from "../auth";
import { firebase } from "../firebase";
import { useSearch } from "./search";
import { materialize } from "./utils";

const rezepteColl = collection(getFirestore(firebase), "rezepte");
const storage = getStorage(firebase);

const Context = createContext();

export function RezepteProvider({ children }) {
  const [docs, loading, error] = useCollection(rezepteColl, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const rezepte = useMemo(() => docs && docs.docs.map(materialize), [docs]);
  return (
    <Context.Provider value={[rezepte, loading, error]}>
      {children}
    </Context.Provider>
  );
}

export function useRezepte({ filter = {} } = {}) {
  const filterFn = useRezepteFilter(filter);
  const [docs, loading, error] = useContext(Context);
  const rezepte = useMemo(
    () => docs && docs.filter(filterFn),
    [docs, filterFn],
  );
  return [rezepte, loading, error];
}

function useRezepteFilter({ kategorien, search }) {
  const index = useSearch();
  const ids = useMemo(
    () => search && index && index.search(search),
    [search, index],
  );

  return useMemo(() => {
    return (rezept) => {
      if (ids && !ids.includes(rezept.id)) return false;
      if (
        kategorien &&
        kategorien.length &&
        !kategorien.some((kat) => rezept.kategorien && rezept.kategorien[kat])
      )
        return false;
      return true;
    };
  }, [kategorien, ids]);
}

export function useRezept(id) {
  const [rezepte, loading, error] = useRezepte();
  return [
    rezepte && rezepte.find((rezept) => rezept.id === id),
    loading,
    error,
  ];
}

export function useSaveRezept(id) {
  const { user } = useAuth();

  return useCallback(
    async (values, images) => {
      const rezeptRef = id ? doc(rezepteColl, id) : doc(rezepteColl);
      const savedImages = await Promise.all(
        images.map((img) => (img.src ? img : saveImage(img, rezeptRef.id))),
      );
      const rezept = {
        ...values,
        images: savedImages,
        owner: user.id,
        updatedAt: serverTimestamp(),
      };
      await setDoc(rezeptRef, rezept);
      return rezeptRef;
    },
    [id, user],
  );
}

export async function deleteRezept(id) {
  await deleteDoc(doc(rezepteColl, id));
  // The recipe is gone at this point; leftover photos are only wasted storage.
  try {
    const { items } = await listAll(ref(storage, `rezepte/${id}`));
    await Promise.all(items.map((item) => deleteObject(item)));
  } catch (error) {
    console.warn("Could not delete photos of recipe", id, error);
  }
}

async function saveImage(file, rezeptId) {
  const size = await getImageSize(file);
  const imageId = ulid();
  const imageRef = ref(storage, `rezepte/${rezeptId}/${imageId}`);
  await uploadBytes(imageRef, file, { cacheControl: "max-age=31536000" });
  const src = await getDownloadURL(imageRef);
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
