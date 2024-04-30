import { User } from '@/types/user';
import { useCookies } from 'react-cookie';
import { atom } from 'recoil';

// const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

export const userInfoAtom = atom<User>({
  key: 'userInfoAtom',
  default: {
    email: '',
    name: '',
    password: '',
    exp: 0,
    iat: 0,
    nbf: 0,
    iss: '',
    aud: '',
    todos: [],
  },
});
