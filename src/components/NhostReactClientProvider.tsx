'use client';

import { useRef } from 'react';
import { NhostClient, type NhostSession, NhostProvider } from '@nhost/react';
import { NhostApolloProvider } from '@nhost/react-apollo';
import Cookies from 'js-cookie';

import { NHOST_SESSION_KEY_CLIENT } from '~/utils/nhost-constants';

export const getClientNhost = () => {
  const sessionCookieValue = Cookies.get(NHOST_SESSION_KEY_CLIENT)!;

  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN ?? 'local',
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
  });

  if (sessionCookieValue) {
    console.log('sessionCookieValue', sessionCookieValue);
    const clientSession = sessionCookieValue
      ? (JSON.parse(sessionCookieValue) as NhostSession)
      : undefined;

    nhost.auth.client.start({ initialSession: clientSession });
  }

  return nhost;
};

export function NhostClientProvider({ children }: { children: React.ReactNode }) {
  const nhostClientInstance = useRef(getClientNhost()).current;

  return (
    <NhostProvider nhost={nhostClientInstance}>
      <NhostApolloProvider nhost={nhostClientInstance}>{children}</NhostApolloProvider>
    </NhostProvider>
  );
}

export default NhostClientProvider;
