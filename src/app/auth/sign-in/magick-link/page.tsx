'use client';

import { useState, type FormEvent } from 'react';

import Input from '~/components/input';
import SubmitButton from '~/components/submit-button';
import { getClientNhost } from '~/components/NhostClientProvider';

export default function SignInMagickLink() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    const nhost = getClientNhost();
    const { error } = await nhost.auth.signIn({ email });

    if (error) {
      setError(error.message);
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-semibold">Sign in with a magick link</h1>

      {error && <p className="mt-3 text-center font-semibold text-red-500">{error}</p>}
      {isSuccess && (
        <p className="mt-3 text-center font-semibold text-green-500">
          Click the link in the email to finish the sign in process
        </p>
      )}

      <form className="w-full max-w-lg space-y-5" onSubmit={handleSignIn}>
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <SubmitButton type="submit" className="w-full">
          Sign In
        </SubmitButton>
      </form>
    </div>
  );
}
