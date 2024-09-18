import { collection, getFirestore } from "firebase/firestore";
import { createContext, useContext, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ErrorMessage from "../ErrorMessage";
import { firebase } from "../firebase";
import Loading from "../Loading";
import { materialize } from "./utils";

const Context = createContext();
const kategorienCollection = collection(getFirestore(firebase), "kategorien");

export function KategorienProvider({ children }) {
  const [data, loading, error] = useCollection(kategorienCollection);
  const context = useMemo(() => data && data.docs.map(materialize), [data]);

  if (error) return <ErrorMessage error={error} layout />;
  if (loading) return <Loading layout />;

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useKategorien() {
  return useContext(Context);
}
