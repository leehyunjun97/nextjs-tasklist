import { getRefreshToken, setAccessTokenCookie } from '@/app/lib/cookie';
import { signJWT, verifyJwt } from '@/app/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const refreshToken = getRefreshToken();

    console.log('api refreshToken', refreshToken);

    const userInfo = await verifyJwt(refreshToken!);
    const newAccessToken = (await signJWT(userInfo!)).accessToken;
    setAccessTokenCookie(newAccessToken);
    return NextResponse.json(newAccessToken, { status: 200 });
  } catch (error) {}
}
