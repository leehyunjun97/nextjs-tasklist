export type userSignKeyType = 'email' | 'name' | 'password';

export interface User {
  email: string;
  name?: string;
  password: string;
  exp?: number;
  iat?: number;
  nbf?: number;
  iss?: string;
  aud?: string;
}
