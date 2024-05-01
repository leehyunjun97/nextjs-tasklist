import { NextRequest, NextResponse } from 'next/server';
import {
  checkToken,
  errorTokenHandler,
  getNewAccessToken,
} from './app/lib/token';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken');
  let refreshToken = request.cookies.get('refreshToken');
  let path = request.nextUrl.pathname;
  let response = NextResponse.redirect(request.url);

  // 액세스 토큰이 있을 시 홈으로 못가게
  if (path === '/' || path === '/signup') {
    // 토큰 유무 확인 함수를...

    if (accessToken) {
      const checkUser = await checkToken(accessToken.value);
      if (!checkUser) return errorTokenHandler(response, request.url);
      return NextResponse.redirect(new URL('/todos', request.url));
    }

    if (refreshToken) {
      const checkUser = await checkToken(refreshToken.value);
      if (!checkUser) return errorTokenHandler(response, request.url);
      response = NextResponse.redirect(new URL('/todos', request.url));
      return getNewAccessToken(checkUser, response);
    }
  }

  if (path === '/todos') {
    // 액세스 토큰이 없을 시 ( 혹은 만료 )
    if (!accessToken) {
      // 리프레시 토큰도 없을 시 로그인(홈)으로 리다이렉팅
      if (!refreshToken)
        return NextResponse.redirect(new URL('/', request.url));

      // 정상 리프레시 토큰인지 확인
      const checkUser = await checkToken(refreshToken.value);

      // 비정상 유저 튕겨내기
      if (!checkUser) return errorTokenHandler(response, request.url);

      // 재발급
      return getNewAccessToken(checkUser, response);
    }

    // 액세스 토큰이 비정상 일 시
    const checkUser = await checkToken(accessToken.value);
    if (!checkUser) return errorTokenHandler(response, request.url);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
