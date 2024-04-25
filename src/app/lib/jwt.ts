import jwt, { JwtPayload } from 'jsonwebtoken';

const DEFAULT_ACCESS_OPTION = {
  expiresIn: '1h',
};

const DEFAULT_REFRESH_OPTION = {
  expiresIn: '7d',
};

const secret_key = process.env.SECRET_KEY;

export const signAccessToken = (
  payload: JwtPayload,
  options = DEFAULT_ACCESS_OPTION
) => {
  // const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
};

export const signRefreshToken = (
  payload: JwtPayload,
  options = DEFAULT_REFRESH_OPTION
) => {
  // const secret_key = process.env.SECRET_KEY;
  const refreshToken = jwt.sign(payload, secret_key!, options);
  return refreshToken;
};

export const verifyJwt = (token: string) => {
  try {
    // const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    // console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
