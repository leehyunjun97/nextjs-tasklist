import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from './services/user/user';
import { signJWT } from './app/lib/jwt';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken');
  let path = request.nextUrl.pathname;

  // 액세스 토큰이 있을 시 홈으로 못가게
  if (path === '/' || path === '/signup') {
    if (accessToken)
      return NextResponse.redirect(new URL('/todos', request.url));
  }

  if (path === '/todos') {
    if (!accessToken) {
      let refreshToken = request.cookies.get('refreshToken');

      // 리프레시 토큰도 없을 시 로그인(홈)으로 리다이렉팅
      if (!refreshToken)
        return NextResponse.redirect(new URL('/', request.url));

      // 재발급
      const user = await getUserInfo(refreshToken.value);
      const newAccessToken = (await signJWT(user)).accessToken;

      const response = NextResponse.redirect(new URL('/todos', request.url));
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: '/',
      });
      return response;
    }
  }

  // 액세스 토큰이 없을 시 (혹은 만료가 되었을 시)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
