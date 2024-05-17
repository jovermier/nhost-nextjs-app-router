'use client';

import { useAuthenticationStatus } from '@nhost/nextjs';

export const ApolloState = () => {
  const authenticationStatus = useAuthenticationStatus();

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-auto border">
        <h1 className="text-xl font-semibold">Session</h1>
        <pre className="overflow-auto">{JSON.stringify(authenticationStatus, null, 2)}</pre>
      </div>
    </div>
  );
};
