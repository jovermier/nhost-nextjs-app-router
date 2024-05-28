'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getNhost } from '@utils/nhost';
import { NHOST_SESSION_KEY_SERVER } from '~/utils/nhost-constants';

export const signUp = async (formData: FormData) => {
  const nhost = await getNhost();

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { session, error } = await nhost.auth.signUp({
    email,
    password,
    options: {
      displayName: `${firstName} ${lastName}`,
    },
  });

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
