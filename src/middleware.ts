import { manageAuthSession } from '~/utils/nhost';

import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);

  return manageAuthSession(request, () =>
    NextResponse.redirect(new URL('/auth/sign-in', requestUrl)),
  );
}
