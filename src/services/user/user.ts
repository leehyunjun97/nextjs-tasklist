export const getUserInfo = async (accessToken: string) => {
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

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
