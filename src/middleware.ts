import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;
  let refreshToken = request.cookies.get('refreshToken')?.value;
  let path = request.nextUrl.pathname;

  // // 액세스 토큰이 있을 시 홈으로 못가게
  if (path === '/' || path === '/signup') {
    if (accessToken || refreshToken)
      return NextResponse.redirect(new URL('/todos', request.url));
  }

  if (path === '/todos') {
    if (!accessToken && !refreshToken)
      return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
