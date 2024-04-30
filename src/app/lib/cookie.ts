import { cookies } from 'next/headers';

export const setAccessTokenCookie = (accessToken: string) => {
  cookies().set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/',
  });
};

export const setRefreshTokenCookie = (refreshToken: string) => {
  cookies().set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
};

export const getAccessToken = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')!.value;
  return accessToken;
};
