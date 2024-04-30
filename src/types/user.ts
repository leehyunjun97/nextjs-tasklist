import { Todo } from './todo';

export type userSignKeyType = 'email' | 'name' | 'password';

export interface User {
  id?: number;
  email: string;
  name?: string;
  password?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
  iss?: string;
  aud?: string;
  todos?: Todo[];
}
