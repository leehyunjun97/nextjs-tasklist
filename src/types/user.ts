export type userSignKeyType = 'email' | 'name' | 'password';

export interface User {
  email: string;
  name?: string;
  password: string;
}
