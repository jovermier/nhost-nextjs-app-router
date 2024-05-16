'use client';

import { useRouter } from 'next/navigation';

export const RouteRefreshButton = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.refresh();
      }}
      className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
    >
      {children ?? 'Refresh'}
    </button>
  );
};
