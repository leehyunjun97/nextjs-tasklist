import { getAccessToken, getRefreshToken, setAccessTokenCookie } from '@/app/lib/cookie';
import { signJWT, verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // const refreshToken = getRefreshToken();
    // const userInfo = await verifyJwt(refreshToken!);
    // const newAccessToken = (await signJWT(userInfo!)).accessToken;
    // setAccessTokenCookie(newAccessToken);
    // return NextResponse.json(newAccessToken, { status: 200 });

    // const a = 1;
    // console.log(a);

    // const cookie = request.cookies.get('accessToken');
    const cookie = getAccessToken();
    console.log('쿠키쿠키: ', cookie);



    return NextResponse.json('asdasdasd', { status: 200 });
  } catch (error) {}
}
