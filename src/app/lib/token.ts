import { getUserInfo } from '@/services/user/user';
import { NextResponse } from 'next/server';

// 토큰 정상 확인 체크 함수
export const checkToken = async (token: string) => {
  const user = await getUserInfo(token);

  // 일일히 확인해야될듯?

  return user?.email;
};

export const errorTokenHandler = async (
  response: NextResponse,
  url: string
) => {
  response = NextResponse.redirect(new URL('/', url));
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
};
