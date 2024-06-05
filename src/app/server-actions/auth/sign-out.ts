'use server';

import { cookies } from 'next/headers';

import { getNhost } from '~/utils/nhost';
import { NHOST_SESSION_KEY_SERVER } from '~/utils/nhost-constants';

export const signOut = async () => {
  const nhost = await getNhost();

  await nhost.auth.signOut();

  [
    NHOST_SESSION_KEY_SERVER,
    'nhostRefreshToken',
    'nhostRefreshTokenId',
    'nhostRefreshTokenExpiresAt',
  ].forEach((key) => {
    cookies().delete(key);
  });

  return { success: true };
};
