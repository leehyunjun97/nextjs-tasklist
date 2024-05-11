import axios from 'axios';

export const deleteCookieApi = async () => {
  try {
    const a = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/cookie/delete`
    );
    return a;
  } catch (error) {}
};
