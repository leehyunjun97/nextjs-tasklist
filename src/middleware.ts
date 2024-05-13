import { NextRequest, NextResponse } from 'next/server';
import { setAccessTokenCookie } from './app/lib/cookie';
import { getAccessTokenFromCookie } from './utils/getCookie';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;
  let refreshToken = request.cookies.get('refreshToken')?.value;
  let path = request.nextUrl.pathname;

  // const response = NextResponse.next();

  // console.log('여기도없음??: ', accessToken);

  if (path === '/api/todos') {
    // console.log('ㅁㄴㅇㅁㄴㅇㅁㄴㅇ');
    // console.log('리스폰스: ', response);
    //   console.log('api 미들웨어: ', request);
    //   // const requestHeaders = new Headers(request.headers);
    //   // requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    //   // const response = NextResponse.next({
    //   //   request: {
    //   //     headers: requestHeaders,
    //   //   },
    //   // });
    //   // return response;
  }

  // // 액세스 토큰이 있을 시 홈으로 못가게
  if (path === '/' || path === '/signup') {

   


    if (accessToken || refreshToken)
      return NextResponse.redirect(new URL('/todos', request.url));
  }

  if (path === '/todos') {
    // console.log('페이지 미들웨어');
    if (!accessToken && !refreshToken)
      return NextResponse.redirect(new URL('/', request.url));

    // const requestHeaders = new Headers(request.headers);

    // requestHeaders.set('Authorization', `Bearer ${accessToken}`);

    // const response = NextResponse.next({
    //   request: {
    //     headers: requestHeaders,
    //   },
    // });

    // return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // '/api/todos/:path',
  ],
};
