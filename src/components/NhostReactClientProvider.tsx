'use client';

import { NhostClient, type NhostSession, NhostProvider } from '@nhost/react';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { type StateFrom } from 'xstate';
import { waitFor } from 'xstate/lib/waitFor';
import { NHOST_SESSION_KEY } from '~/utils/nhost-constants';

export const getClientNhost = () => {
  const sessionCookieValue = Cookies.get(NHOST_SESSION_KEY)! as string;

  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN ?? 'local',
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    // startSession: false
  });

  if (sessionCookieValue) {
    const serverSession: NhostSession = JSON.parse(
      atob(sessionCookieValue) || 'null',
    ) as NhostSession;

    nhost.auth.client.start({ initialSession: serverSession });

    // await waitFor(
    //   nhost.auth.client.interpreter!,
    //   (state: StateFrom<any>) => !state.hasTag('loading'),
    // );
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
