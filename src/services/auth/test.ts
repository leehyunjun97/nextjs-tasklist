import axios from 'axios';

export const testApi = async () => {
  try {
    const a = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test`);
    return a;
  } catch (error) {}
};
