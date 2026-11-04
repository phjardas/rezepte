import { useCallback } from "react";
import { useNavigate } from "react-router";
import MiniLayout from "../MiniLayout";
import SignIn from "../SignIn";

export default function SignInPage() {
  const navigate = useNavigate();
  const onSuccess = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from") ?? "/";
    navigate(from);
  }, [navigate]);

  return (
    <MiniLayout>
      <SignIn onSuccess={onSuccess} />
    </MiniLayout>
  );
}
