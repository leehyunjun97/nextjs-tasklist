import { User } from '@/types/user';
import { clientInstance } from '@/utils/clientInterceptor';

export const fetchUserInfoApi = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    return data.data as User;
  } catch (error) {
    console.log(error);
  }
};

export const emailCheckApi = async (email: string) => {
  try {
    const response = await clientInstance.post(`/api/user/signup/emailCheck`, {
      email,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutApiCall = async () => {
  try {
    await clientInstance.get(`/api/user/logout`);
  } catch (error) {
    console.log(error);
  }
};

export const loginApi = async (signInState: User) => {
  try {
    const response = await clientInstance.post(`/api/user/login`, {
      email: signInState.email,
      password: signInState.password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupApi = async (signupState: User) => {
  try {
    await clientInstance.post(`/api/user/signup`, {
      email: signupState.email,
      name: signupState.name,
      password: signupState.password,
    });
  } catch (error) {
    console.log(error);
  }
};
