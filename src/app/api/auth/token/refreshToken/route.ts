import { getRefreshToken, setAccessTokenCookie } from '@/app/lib/cookie';
import { signJWT } from '@/app/lib/jwt';
import { fetchUserInfoApi } from '@/services/user/user';
import { verify } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const refreshToken = getRefreshToken();
    const userInfo = await fetchUserInfoApi(refreshToken!);
    const newAccessToken = (await signJWT(userInfo!)).accessToken;
    setAccessTokenCookie(newAccessToken);
    return NextResponse.json(newAccessToken, { status: 200 });
  } catch (error) {}
}
