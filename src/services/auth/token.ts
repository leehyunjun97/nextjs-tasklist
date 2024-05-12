import axios from 'axios';

export const isVaildTokenApi = async (token: string | null | undefined) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/validateToken`,
      {
        token,
      }
    );
    // console.log('result: ', result.data);

    return await result.data;
  } catch (error) {
    // console.log(error);
  }
};

export const refreshTokenApi = async () => {
  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/refreshToken`
    );
  } catch (error) {}
};
