// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './app/lib/jwt';
import { getUserInfo } from './services/user/user';

export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url));
  // }

  // let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);

  // const cookieStore = cookies();

  // let accessToken = cookieStore.get('accessToken');

  let accessToken = request.cookies.get('accessToken');

  if (accessToken) {
    console.log('왔니?: ', accessToken.value);
    const user = await getUserInfo(accessToken.value);
    console.log('유저: ', user);
  } else {
  }

  return NextResponse.redirect(new URL('/todos', request.url));
}

export const config = {
  matcher: ['/test/:path*'],
};
