'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getNhost } from '@utils/nhost';
import { NHOST_SESSION_KEY_SERVER } from '~/utils/nhost-constants';

export const signOut = async () => {
  const nhost = await getNhost();

  await nhost.auth.signOut();

  cookies().delete(NHOST_SESSION_KEY_SERVER);

  redirect('/');
};
