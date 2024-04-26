import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from './services/user/user';
import { signJWT } from './app/lib/jwt';

export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url));
  // }

  let accessToken = request.cookies.get('accessToken');

  // 액세스 토큰이 없을 시 (혹은 만료가 되었을 시)
  if (!accessToken) {
    let refreshToken = request.cookies.get('refreshToken');

    // 리프레시 토큰도 없을 시 로그인(홈)으로 리다이렉팅
    if (!refreshToken) return NextResponse.redirect(new URL('/', request.url));

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

  // const user = await getUserInfo(accessToken.value);
  return NextResponse.redirect(new URL('/todos', request.url));
}

export const config = {
  matcher: ['/todos/:path*'],
};
