import { cookies } from 'next/headers';

export const setAccessTokenCookie = (accessToken: string) => {
  cookies().set({
    domain: 'localhost',
    name: 'accessToken',
    value: accessToken,
    httpOnly: false,
    maxAge: 60 * 60,
    path: '/',
  });
};

export const setRefreshTokenCookie = (refreshToken: string) => {
  cookies().set({
    domain: 'localhost',
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: false,
    maxAge: 60 * 60 * 24,
    path: '/',
  });
};

export const getAccessToken = () => {
  const cookieStore = cookies();
  if (!cookieStore) return null;
  const accessToken = cookieStore.get('accessToken')?.value;
  return accessToken;
};

export const getRefreshToken = () => {
  const cookieStore = cookies();
  if (!cookieStore) return null;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  return refreshToken;
};

export const deleteTokens = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};
