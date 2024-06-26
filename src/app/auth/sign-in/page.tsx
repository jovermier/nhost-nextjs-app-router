'use client';

import { useRouter } from 'next/navigation';

import { signInWithGoogle } from '~/app/server-actions/auth';

export default function SignIn() {
  const router = useRouter();

  return (
    <div className="container flex justify-center">
      <div className="w-full max-w-lg space-y-5">
        <h1 className="text-center text-2xl font-semibold">Sign In</h1>

        <button
          className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => router.push('/auth/sign-in/email-password')}
        >
          with email/password
        </button>

        <button
          className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => router.push('/auth/sign-in/webauthn')}
        >
          with a security key
        </button>

        <button
          className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => router.push('/auth/sign-in/magick-link')}
        >
          with a magick link
        </button>

        <button
          className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => router.push('/auth/sign-in/pat')}
        >
          with a Personal Access Token
        </button>

        <button
          type="button"
          className="mb-2 mr-2 inline-flex w-full items-center justify-between rounded-lg bg-[#4285F4] px-5 py-2.5 text-center font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55"
          onClick={() => signInWithGoogle()}
        >
          <svg
            className="-ml-1 mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          with Google <span />
        </button>
      </div>
    </div>
  );
}
