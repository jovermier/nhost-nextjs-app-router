import {
  type AuthErrorPayload,
  NhostClient,
  type NhostSession,
  type AuthMachine,
} from '@nhost/nhost-js';
import { cookies } from 'next/headers';

import { type NextRequest, NextResponse } from 'next/server';
import { type StateFrom } from 'xstate/lib/types';
import { waitFor } from 'xstate/lib/waitFor';
import { NHOST_SESSION_KEY_SERVER } from './nhost-constants';

export const getNhost = async (request?: NextRequest) => {
  const $cookies = request?.cookies ?? cookies();

  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN ?? 'local',
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    start: false,
  });

  const sessionCookieValue = $cookies.get(NHOST_SESSION_KEY_SERVER)?.value;
  const initialSession = sessionCookieValue
    ? (JSON.parse(atob(sessionCookieValue)) as NhostSession)
    : undefined;

  // if (!initialSession) {
  //   const nhostRefreshToken = $cookies.get('nhostRefreshToken')?.value;

  //   if (nhostRefreshToken) {
  //     const session = await nhost.auth.refreshSession(nhostRefreshToken);
  //     if (session) {
  //       initialSession = session.session ?? undefined;
  //     }
  //   }
  // }

  nhost.auth.client.start({ initialSession });
  await waitFor(
    nhost.auth.client.interpreter!,
    (state: StateFrom<AuthMachine>) => !state.hasTag('loading'),
  );

  console.log(
    JSON.stringify(
      {
        getNhost: {
          initialSession: initialSession ?? null,
          getSession: nhost.auth.getSession(),
          getHasuraClaims: nhost.auth.getHasuraClaims(),
        },
      },
      null,
      2,
    ),
  );

  return nhost;
};

export const manageAuthSession = async (
  request: NextRequest,
  onError?: (error: AuthErrorPayload) => NextResponse,
) => {
  const nhost = await getNhost(request);
  const session = nhost.auth.getSession();

  const url = new URL(request.url);
  const refreshToken = url.searchParams.get('refreshToken') ?? undefined;

  const currentTime = Math.floor(Date.now() / 1000);
  const tokenExpirationTime = nhost.auth.getDecodedAccessToken()?.exp;
  const accessTokenExpired = session && tokenExpirationTime && currentTime > tokenExpirationTime;

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (accessTokenExpired || refreshToken) {
    const { session: newSession, error } = await nhost.auth.refreshSession(refreshToken);

    if (error) {
      onError?.(error);
    }

    // remove the refreshToken from the url
    url.searchParams.delete('refreshToken');

    // overwrite the session cookie with the new session
    return NextResponse.redirect(url, {
      headers: {
        'Set-Cookie': `${NHOST_SESSION_KEY_SERVER}=${btoa(JSON.stringify(newSession))}; Path=/`,
      },
    });
  }
};
