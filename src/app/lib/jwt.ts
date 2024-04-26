import jwt, { JwtPayload } from 'jsonwebtoken';

export const DEFAULT_ACCESS_OPTION = {
  expiresIn: '1h',
};

export const DEFAULT_REFRESH_OPTION = {
  expiresIn: '7d',
};

export const secret_key = process.env.SECRET_KEY;

export const signAccessToken = (
  payload: JwtPayload,
  options = DEFAULT_ACCESS_OPTION
) => {
  const token = jwt.sign(payload, secret_key!, options);
  return token;
};

export const signRefreshToken = (
  payload: JwtPayload,
  options = DEFAULT_REFRESH_OPTION
) => {
  const refreshToken = jwt.sign(payload, secret_key!, options);
  return refreshToken;
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
