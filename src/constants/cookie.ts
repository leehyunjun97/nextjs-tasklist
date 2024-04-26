export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7, // 1주일 동안 유효
  sameSite: 'strict',
  path: '/',
};
