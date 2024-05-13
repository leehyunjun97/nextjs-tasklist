import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
} from '@/app/lib/cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const refreshToken = getRefreshToken();
    console.log('리프레시토큰: ', refreshToken);

    deleteTokens();

    // console.log('api 호출');
    // const accessToken = getAccessToken();

    // console.log('403 액세스토큰: ', accessToken);

    request.cookies.delete('accessToken');
    request.cookies.delete('refreshToken');

    // console.log('api 쿠키 삭제 후');

    const response = NextResponse.json('asdasdasd', { status: 200 });
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {}
}
