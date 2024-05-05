import { User } from '@/types/user';
import { privateInstance } from '@/utils/axiosInterceptor';

export const fetchUserInfoApi = async (accessToken: string) => {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/`,
    //   {
    //     method: 'get',
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   }
    // );

    // const data = await response.json();

    // return data.data as User;

    const response = await privateInstance.get('/api/user');
    console.log('유저리스폰스: ', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const emailCheckApi = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup/emailCheck`,
      {
        method: 'post',
        body: JSON.stringify({
          email,
        }),
        cache: 'no-store',
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutApiCall = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/logout`);
  } catch (error) {
    console.log(error);
  }
};

export const loginApi = async (signInState: User) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
      {
        method: 'post',
        body: JSON.stringify({
          email: signInState.email,
          password: signInState.password,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const signupApi = async (signupState: User) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
      {
        method: 'post',
        body: JSON.stringify({
          email: signupState.email,
          name: signupState.name,
          password: signupState.password,
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};
