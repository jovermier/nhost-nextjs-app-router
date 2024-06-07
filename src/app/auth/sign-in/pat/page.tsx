'use client';

import { useState } from 'react';

import Input from '~/components/input';
import SubmitButton from '~/components/submit-button';
import { signInWithPAT } from '~/app/server-actions/auth';

export default function SignInWithPAT() {
  const [error, setError] = useState('');

  async function handleSignIn(formData: FormData) {
    const response = await signInWithPAT(formData);

    if (response?.error) {
      setError(response.error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-2xl font-semibold">Sign In with Personal Access Token</h1>

      {error && <p className="mt-3 text-center font-semibold text-red-500">{error}</p>}

      <form className="w-full max-w-lg space-y-5" action={handleSignIn}>
        <Input label="PAT" id="pat" name="pat" required />
        <SubmitButton type="submit" className="w-full">
          Sign In
        </SubmitButton>
      </form>
    </div>
  );
}
