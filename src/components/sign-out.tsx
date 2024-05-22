'use client';

import { useUserData } from '@nhost/nextjs';

export default function SignOut({ signOut }: { signOut: () => Promise<void> }) {
  const userData = useUserData();

  const name = userData?.displayName;

  return (
    <button
      onClick={() => signOut()}
      className="inline-block px-4 py-2 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-opacity-75"
    >
      {name ? `Sign out ${name}` : 'Sign out (?)'}
    </button>
  );
}
