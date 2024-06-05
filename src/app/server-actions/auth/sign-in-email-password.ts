'use server';

import { cookies } from 'next/headers';

import { getNhost } from '~/utils/nhost';
import { NHOST_SESSION_KEY_SERVER } from '~/utils/nhost-constants';

export const signIn = async (formData: FormData) => {
  const nhost = await getNhost();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { session, error } = await nhost.auth.signIn({ email, password });

  if (session) {
    cookies().set(NHOST_SESSION_KEY_SERVER, btoa(JSON.stringify(session)), { path: '/' });
    return { success: true, session };
  }

  if (error) {
    return {
      error: error?.message,
    };
  }
};
