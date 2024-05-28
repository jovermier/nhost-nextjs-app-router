'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getNhost } from '@utils/nhost';
import { NHOST_SESSION_KEY_SERVER } from '~/utils/nhost-constants';

export const signInWithPAT = async (formData: FormData) => {
  const nhost = await getNhost();

  const pat = formData.get('pat') as string;

  const { session, error } = await nhost.auth.signInPAT(pat);

  if (session) {
    cookies().set(NHOST_SESSION_KEY_SERVER, btoa(JSON.stringify(session)), { path: '/' });
    redirect('/');
  }

  if (error) {
    return {
      error: error?.message,
    };
  }
};
