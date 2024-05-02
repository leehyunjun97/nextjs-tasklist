import { User } from '@/types/user';

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
