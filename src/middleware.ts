import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from './services/user/user';
// import { signAccessToken } from './app/lib/jwt';

export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url));
  // }

  let accessToken = request.cookies.get('accessToken');

  if (!accessToken) return NextResponse.redirect(new URL('/', request.url));

  // 액세스 토큰이 없을 시 (혹은 만료가 되었을 시)
  // if (!accessToken) {
  //   let refreshToken = request.cookies.get('refreshToken');

  //   // 리프레시 토큰도 없을 시 로그인(홈)으로 리다이렉팅
  //   if (!refreshToken) return NextResponse.redirect(new URL('/', request.url));

  //   const user = await getUserInfo(refreshToken.value);
  //   const newAccessToken = signAccessToken(user);

  //   console.log('새로운 액세스 토큰 발급: ', newAccessToken);

  //   return NextResponse.redirect(new URL('/todos', request.url));
  // }

  const user = await getUserInfo(accessToken.value);

  console.log(user);

  return NextResponse.redirect(new URL('/todos', request.url));
}

export const config = {
  matcher: ['/test/:path*'],
};
