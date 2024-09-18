import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./auth";
import GlobalError from "./GlobalError";
import { ThemeProvider } from "./theme";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={GlobalError}>
        <AuthProvider>{children}</AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
