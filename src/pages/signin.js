import qs from 'query-string';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniLayout from '../MiniLayout';
import SignIn from '../SignIn';

export default function SignInPage() {
  const navigate = useNavigate();
  const onSuccess = useCallback(() => {
    const from = qs.parse(window.location.search) || '/';
    navigate(from);
  }, [navigate]);

  return (
    <MiniLayout>
      <SignIn onSuccess={onSuccess} />
    </MiniLayout>
  );
}
