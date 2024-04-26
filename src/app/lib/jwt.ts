// import jwt, { JwtPayload } from 'jsonwebtoken';

import jwt, { SignJWT, jwtVerify } from 'jose';

// export const DEFAULT_ACCESS_OPTION = {
//   expiresIn: '1h',
// };

// export const DEFAULT_REFRESH_OPTION = {
//   expiresIn: '7d',
// };

// export const signAccessToken = (
//   payload: JwtPayload,
//   options = DEFAULT_ACCESS_OPTION
// ) => {
//   const token = jwt.sign(payload, secret_key!, options);
//   return token;
// };

// export const signRefreshToken = (
//   payload: JwtPayload,
//   options = DEFAULT_REFRESH_OPTION
// ) => {
//   const refreshToken = jwt.sign(payload, secret_key!, options);
//   return refreshToken;
// };

// export const verifyJwt = (token: string) => {
//   try {
//     const decoded = jwt.verify(token, secret_key!);
//     return decoded as JwtPayload;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const DEFAULT_ACCESS_OPTION = 60 * 60 * 1;
export const DEFAULT_REFRESH_OPTION = 60 * 60 * 24 * 7;

export const issuer = process.env.JWT_ISSUER;
export const audience = process.env.JWT_AUDIENCE;
export const secret_key = process.env.SECRET_KEY;

export const signJWT = async (payload: object) => {
  // 현재 시간을 나타냄
  const iat = Math.floor(Date.now() / 1000);
  const accessExp = iat + DEFAULT_ACCESS_OPTION;
  const refreshExp = iat + DEFAULT_REFRESH_OPTION;

  const accessToken = await new SignJWT({ ...payload })
    // 보호 헤더 HS256의 알고리즘을 사용
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    // 토큰의 만료시간
    .setExpirationTime(accessExp)
    // 토큰이 발급되는 시간
    .setIssuedAt(iat)
    // 토큰의 사용 가능 시작 시간 (보통 발급되는 시간과 동일)
    .setNotBefore(iat)
    .setIssuer(issuer!)
    .setAudience(audience!)
    // 토큰 서명 시크릿키 사용 인코딩
    .sign(new TextEncoder().encode(secret_key));

  const refreshToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(refreshExp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .setIssuer(issuer!)
    .setAudience(audience!)
    .sign(new TextEncoder().encode(secret_key));
  return { accessToken, refreshToken };
};

export const verifyJwt = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(secret_key);
    const decoded = await jwtVerify(token, secret, {
      issuer,
      audience,
    });

    return decoded.payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
