'use client';

import { useUserData } from '@nhost/nextjs';

export const dynamic = 'force-dynamic';

export const UserState = () => {
  const userData = useUserData();

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-auto border">
        <h1 className="text-xl font-semibold">User Data (useUserData)</h1>
        <pre className="overflow-auto">{JSON.stringify(userData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default UserState;
