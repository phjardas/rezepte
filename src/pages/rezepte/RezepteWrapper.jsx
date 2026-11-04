import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../auth";
import { KategorienProvider, RezepteProvider } from "../../data";
import { SearchProvider } from "../../data/search";

export default function RezepteWrapper() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const from = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signin?from=${from}`} replace />;
  }

  return (
    <KategorienProvider>
      <RezepteProvider>
        <SearchProvider>
          <Outlet />
        </SearchProvider>
      </RezepteProvider>
    </KategorienProvider>
  );
}
