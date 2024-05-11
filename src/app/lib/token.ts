import { User } from '@/types/user';
import { NextResponse } from 'next/server';
import { signJWT } from './jwt';

export const errorTokenHandler = (response: NextResponse, url: string) => {
  response = NextResponse.redirect(new URL('/', url));
  // response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
};

// export const getNewAccessToken = async (user: User, response: NextResponse) => {
//   const newAccessToken = (await signJWT(user)).accessToken;
//   response.cookies.set('accessToken', newAccessToken, {
//     httpOnly: true,
//     maxAge: 60 * 60,
//     path: '/',
//   });
//   return response;
// };
