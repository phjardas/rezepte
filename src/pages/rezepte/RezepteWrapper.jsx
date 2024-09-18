import { Outlet } from "react-router-dom";
import { KategorienProvider, RezepteProvider } from "../../data";
import { SearchProvider } from "../../data/search";

export default function RezepteWrapper() {
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
