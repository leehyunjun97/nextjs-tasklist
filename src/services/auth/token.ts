export const isVaildTokenApi = async (token: string | null | undefined) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/validateToken/`,
      {
        method: 'post',
        body: JSON.stringify({ token }),
      }
    );

    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

export const refreshTokenApi = async () => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/refreshToken`
    );
  } catch (error) {}
};
 