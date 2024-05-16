'use server';

import { redirect } from 'next/navigation';

import { getNhost } from '@utils/nhost';

export const signInWithGoogle = async () => {
  const nhost = await getNhost();

  const { providerUrl } = await nhost.auth.signIn({
    provider: 'google',
    options: {
      redirectTo: `/oauth`,
    },
  });

  if (providerUrl) {
    redirect(providerUrl);
  }
};
