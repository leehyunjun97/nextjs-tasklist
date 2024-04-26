import { getUserInfo } from '@/services/user/user';
import { saveTokenLocalStorage } from './localStorage';
import { cookies } from 'next/headers';

export const handleLoginReponse = async (response: Response) => {
  try {
    if (response.ok) {
      const responseOk = await response.json();
      const { accessToken, refreshToken } = responseOk.data;

      // saveTokenLocalStorage(accessToken, refreshToken);

      // return await getUserInfo(accessToken);
    } else return await response.json();
  } catch (error) {
    console.log(error);
  }
};
