'use client';

import { useRouter } from 'next/navigation';
import { useUserData, useSignOut } from '@nhost/nextjs';

import { signOut } from '~/app/server-actions/auth';

export default function SignOut() {
  const userData = useUserData();
  const router = useRouter();
  const { signOut: clientSignOut } = useSignOut();

  const name = userData?.displayName;

  const handleSignOut = async () => {
    const res = await signOut();

    if (res.success) {
      await clientSignOut();
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-block rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-opacity-75"
    >
      {name ? `Sign out ${name}` : 'Sign out (?)'}
    </button>
  );
}
