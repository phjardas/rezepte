import ErrorMessage from "./ErrorMessage";

export default function GlobalError({ error }) {
  return <ErrorMessage error={error} layout />;
}
