import { NextRequest, NextResponse } from 'next/server';
import { isVaildTokenApi } from './services/auth/token';
import { errorTokenHandler, getNewAccessToken } from './app/lib/token';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;
  let refreshToken = request.cookies.get('refreshToken')?.value;
  let path = request.nextUrl.pathname;
  let response = NextResponse.redirect(request.url);

  // // 액세스 토큰이 있을 시 홈으로 못가게
  if (path === '/' || path === '/signup') {
    if (accessToken || refreshToken)
      return NextResponse.redirect(new URL('/todos', request.url));
  }

  if (path === '/todos') {
    if (!accessToken && !refreshToken)
      return NextResponse.redirect(new URL('/', request.url));

    try {
      const accessVaildResult = await isVaildTokenApi(accessToken);

      // 액세스 토큰 확인 401 일 시
      if (accessVaildResult.status === 401) {
        // console.log('액세스 401');
        const refreshVaildResult = await isVaildTokenApi(refreshToken);
        // 리프레시 토큰 401 일 시 ( 쿠키 삭제 )
        if (refreshVaildResult.status === 401)
          errorTokenHandler(response, request.url);

        // 재발급
        return await getNewAccessToken(refreshVaildResult.userInfo, response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
