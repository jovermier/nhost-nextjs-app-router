'use client';

import { NhostClient, type NhostSession, NhostProvider } from '@nhost/react';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { type StateFrom } from 'xstate';
import { waitFor } from 'xstate/lib/waitFor';

const NHOST_SESSION_KEY = 'nhostSession';

export const getClientNhost = async () => {
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

    await waitFor(
      nhost.auth.client.interpreter!,
      (state: StateFrom<any>) => !state.hasTag('loading'),
    );
  }

  return nhost;
};

export function NhostClientProvider({ children }: { children: React.ReactNode }) {
  const [nhostClientInstance, setNhostClientInstance] = useState<NhostClient | null>(null);

  useEffect(() => {
    getClientNhost()
      .then((nhostClientInstance) => {
        setNhostClientInstance(nhostClientInstance);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!nhostClientInstance) {
    return null;
  }

  return (
    <NhostProvider nhost={nhostClientInstance}>
      <NhostApolloProvider nhost={nhostClientInstance}>{children}</NhostApolloProvider>
    </NhostProvider>
  );
}

export default NhostClientProvider;
