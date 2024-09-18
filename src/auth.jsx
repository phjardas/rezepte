import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { version } from "./config";
import ErrorMessage from "./ErrorMessage";
import { firebase } from "./firebase";
import Loading from "./Loading";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState(getAuth(firebase));

  if (error) throw error;
  if (loading) return <Loading layout />;

  return user ? (
    <AuthenticatedProvider user={user}>{children}</AuthenticatedProvider>
  ) : (
    children
  );
}

function AuthenticatedProvider({ user: fbUser, children }) {
  const userDoc = useMemo(
    () => doc(getFirestore(firebase), "users", fbUser.uid),
    [fbUser.uid]
  );
  const [{ initialized, user, loading, error }, setState] = useState({
    loading: true,
  });
  const [data, fbLoading, fbError] = useDocument(userDoc);

  useEffect(() => {
    async function initialize() {
      try {
        if (!fbLoading && !fbError && !initialized) {
          setState((s) => ({ ...s, initialized: true }));

          if (data.exists) {
            await updateDoc(userDoc, {
              lastLogin: serverTimestamp(),
              appVersion: version,
            });
          } else {
            await setDoc(userDoc, {
              label: fbUser.displayName,
              photoURL: fbUser.photoURL,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
              appVersion: version,
            });
          }
        }
      } catch (error) {
        setState((s) => ({ ...s, error }));
      }
    }

    initialize();
  }, [fbUser, fbLoading, fbError, data, initialized, setState, userDoc]);

  useEffect(() => {
    if (initialized && data) {
      setState({
        loading: false,
        initialized: true,
        user: { ...data.data(), id: fbUser.uid },
      });
    }
  }, [initialized, data, fbUser.uid]);

  const context = useMemo(
    () => ({
      user,
      token: fbUser.getIdToken(),
      signOut: () => getAuth(firebase).signOut(),
    }),
    [user, fbUser]
  );

  if (error) return <ErrorMessage error={error} layout />;
  if (fbError) return <ErrorMessage error={fbError} layout />;
  if (loading) return <Loading layout />;

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
