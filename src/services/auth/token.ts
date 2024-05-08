import axios from 'axios';

// export const isVaildTokenApi = async () => {
//   await axios.post(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/validateToken`
//   );
// };

export const isVaildTokenApi = async (token: string | null) => {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/validateToken`,
    {
      token,
    }
  );

  return result;
};
