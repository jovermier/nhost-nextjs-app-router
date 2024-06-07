'use client';

import { useRouter } from 'next/navigation';

export const RouteRefreshButton = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.refresh();
      }}
      className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
    >
      {children ?? 'Refresh'}
    </button>
  );
};
