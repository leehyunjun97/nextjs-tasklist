import axios from 'axios';

export const isVaildTokenApi = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/validateToken`
  );
};
