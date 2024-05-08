import { fetchUserInfoApi } from '@/services/user/user';
import { User } from '@/types/user';
import { NextRequest, NextResponse } from 'next/server';
import { signJWT, verifyJwt } from './jwt';

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

export const isVaildToken = async (request: NextRequest) => {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken)
    return { userInfo: null, status: 401, message: 'No Authorization' };

  const userInfo = await verifyJwt(accessToken.split(' ')[1]);

  if (!userInfo)
    return { userInfo: null, status: 403, message: 'Forbidden 입니다' };

  return { userInfo, status: 200, message: '' };
};
