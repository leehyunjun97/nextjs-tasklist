import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url));
  // }

  // let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);

  const cookieStore = cookies();

  let accessToken = cookieStore.get('accessToken');

  console.log(accessToken?.value);

  return NextResponse.redirect(new URL('/todos', request.url));
}

export const config = {
  matcher: ['/test/:path*'],
};
