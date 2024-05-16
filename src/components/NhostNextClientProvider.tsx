'use client';

import { NhostClient, type NhostSession, NhostProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { NHOST_SESSION_KEY } from '~/utils/nhost-constants';

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN ?? 'local',
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
});

export const getClientNhost = () => {
  const sessionCookieValue = Cookies.get(NHOST_SESSION_KEY)! as string;

  if (sessionCookieValue) {
    console.log('sessionCookieValue', sessionCookieValue);
    const serverSession: NhostSession = JSON.parse(
      sessionCookieValue[0] === '{' ? sessionCookieValue : atob(sessionCookieValue) || 'null',
    ) as NhostSession;

    nhost.auth.client.start({ initialSession: serverSession });
  }

  return nhost;
};

export function NhostClientProvider({ children }: { children: React.ReactNode }) {
  const [nhostClientInstance, setNhostClientInstance] = useState(() => getClientNhost());

  return (
    <NhostProvider nhost={nhostClientInstance}>
      <NhostApolloProvider nhost={nhostClientInstance}>{children}</NhostApolloProvider>
    </NhostProvider>
  );
}

export default NhostClientProvider;
