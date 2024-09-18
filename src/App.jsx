import { useRegisterSW } from "virtual:pwa-register/react";
import Providers from "./Providers";
import Pages from "./pages";

export default function App() {
  useRegisterSW({ immedate: true });

  return (
    <Providers>
      <Pages />
    </Providers>
  );
}
