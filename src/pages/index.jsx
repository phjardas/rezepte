import { lazy, Suspense, useMemo } from "react";
import { Navigate, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../Loading";

const SignIn = lazy(() => import("./signin"));
const NotFound = lazy(() => import("./404"));

const RezepteWrapper = lazy(() => import("./rezepte/RezepteWrapper"));
const Rezept = lazy(() => import("./rezepte/Rezept"));
const Rezepte = lazy(() => import("./rezepte/Rezepte"));
const NeuesRezept = lazy(() => import("./rezepte/NeuesRezept"));
const RezeptBearbeiten = lazy(() => import("./rezepte/RezeptBearbeiten"));

export default function Pages() {
  return (
    <Suspense fallback={<Loading layout={true} />}>
      <RouterProvider router={useRouter()} />
    </Suspense>
  );
}

function useRouter() {
  return useMemo(
    () =>
      createBrowserRouter([
        { index: true, element: <Navigate to="/rezepte" /> },
        { path: "/signin", element: <SignIn /> },
        {
          path: "/rezepte",
          element: <RezepteWrapper />,
          children: [
            { index: true, element: <Rezepte /> },
            { path: "_neu", element: <NeuesRezept /> },
            { path: ":id", element: <Rezept /> },
            { path: ":id/bearbeiten", element: <RezeptBearbeiten /> },
          ],
        },
        { path: "*", element: <NotFound /> },
      ]),
    []
  );
}
