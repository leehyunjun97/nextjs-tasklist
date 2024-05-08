import { fetchUserInfoApi } from '@/services/user/user';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';
import { signJWT } from './jwt';

// 토큰 정상 확인 체크 함수
export const checkToken = async (token: string) => {
  const user = await fetchUserInfoApi(token);
  return user;
};

export const errorTokenHandler = (response: NextResponse, url: string) => {
  response = NextResponse.redirect(new URL('/', url));
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
};

export const getNewAccessToken = async (user: User, response: NextResponse) => {
  const newAccessToken = (await signJWT(user)).accessToken;
  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/',
  });
  return response;
};
