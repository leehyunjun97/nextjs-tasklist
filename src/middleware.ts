import { NextRequest, NextResponse } from 'next/server';
import { isVaildTokenApi } from './services/auth/token';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;
  let refreshToken = request.cookies.get('refreshToken')?.value;
  let path = request.nextUrl.pathname;

  if (path === '/api/todos') {
    console.log('api 쿠키: ', request.headers);
    // 쿠키가 없음
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
    if (!accessToken && !refreshToken)
      return NextResponse.redirect(new URL('/', request.url));

    // const vaild = await isVaildTokenApi(accessToken);

    try {
      const vaild = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/validateToken/`,
        {
          method: 'POST',
          body: JSON.stringify({ token: `Bearer ${accessToken}` }),
        }
      )
        .then(async (item) => {
          return await item.json();
        })
        .then((item) => {
          console.log(item);
        });

      // const data = await vaild.json();
      // console.log('미들웨어 밸리드:', vaild);
    } catch (error) {
      console.log(error);
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/todos/:path',
  ],
};
