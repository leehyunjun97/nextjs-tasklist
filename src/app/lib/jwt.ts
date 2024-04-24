import jwt, { JwtPayload } from 'jsonwebtoken';

const DEFAULT_SIGN_OPTION = {
  expiresIn: '1h',
};

export function signAccessToken(
  payload: JwtPayload,
  options = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function signRefreshToken(
  payload: JwtPayload,
  options = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}
