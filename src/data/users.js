import { doc, getFirestore } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { firebase } from "../firebase";
import { materialize } from "./utils";

export function useUser(id) {
  const userDoc = useMemo(() => doc(getFirestore(firebase), "users", id), [id]);
  const [data, loading, error] = useDocument(userDoc, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  if (loading || error || !data) return [data, loading, error];
  return [materialize(data), false];
}
