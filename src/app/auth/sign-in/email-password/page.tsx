'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNhostClient } from '@nhost/nextjs';

import Input from '~/components/input';
import SubmitButton from '~/components/submit-button';
import { signIn } from '~/app/server-actions/auth';

export default function SignInWithEmailAndPassword() {
  const [error, setError] = useState('');
  const nhost = useNhostClient();
  const router = useRouter();

  async function handleSignIn(formData: FormData) {
    const response = await signIn(formData);

    if (response?.success) {
      const refreshToken = response.session.refreshToken;
      if (refreshToken) {
        await nhost.auth.refreshSession(refreshToken);
        router.push('/');
      }
    }

    if (response?.error) {
      setError(response.error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-semibold">Sign in with email and password</h1>

      {error && <p className="mt-3 text-center font-semibold text-red-500">{error}</p>}

      <form className="w-full max-w-lg space-y-5" action={handleSignIn}>
        <Input label="Email" id="email" name="email" type="email" required />

        <Input label="Password" id="password" name="password" type="password" required />

        <SubmitButton type="submit" className="w-full">
          Sign in
        </SubmitButton>
      </form>
    </div>
  );
}
