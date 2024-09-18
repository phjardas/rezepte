import Fuse from "fuse.js";
import { createContext, useContext, useMemo } from "react";
import { useRezepte } from "./rezepte";

const Context = createContext();

export function SearchProvider({ children }) {
  const [rezepte] = useRezepte();
  const context = useMemo(
    () =>
      rezepte &&
      new Fuse(rezepte, {
        keys: ["title", "text"],
        id: "id",
        threshold: 0.4,
      }),
    [rezepte]
  );
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useSearch() {
  return useContext(Context);
}
