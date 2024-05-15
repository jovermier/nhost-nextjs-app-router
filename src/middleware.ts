import { manageAuthSession } from '@utils/nhost';

// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);

  return manageAuthSession(request, () =>
    NextResponse.redirect(new URL('/auth/sign-in', requestUrl)),
  );
}
