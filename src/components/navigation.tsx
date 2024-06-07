import dynamicImport from 'next/dynamic';
import Link from 'next/link';

import { getNhost } from '../utils/nhost';

const SignOut = dynamicImport(() => import('./sign-out'), {
  ssr: false,
});

export default async function Navigation() {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();

  const nav = [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/protected/todos',
      name: `${user ? '🔓' : '🔒'} Todos`,
    },
    {
      href: '/protected/echo',
      name: `${user ? '🔓' : '🔒'} Echo`,
    },
    {
      href: '/protected/pat',
      name: `${user ? '🔓' : '🔒'} PAT`,
    },
  ];

  return (
    <header className="bg-indigo-600">
      <nav className="container mx-auto">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <div className="ml-10 space-x-8">
              {nav.map((link) => (
                <Link
                  prefetch={false}
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {user ? (
              <SignOut />
            ) : (
              <>
                <Link
                  prefetch={false}
                  href="/auth/sign-in"
                  className="inline-block rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-opacity-75"
                >
                  Sign in
                </Link>
                <Link
                  prefetch={false}
                  href="/auth/sign-up"
                  className="inline-block rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
