import axios from 'axios';
import { NextResponse } from 'next/server';

export const isVaildTokenApi = async (token: string | null | undefined) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token/validateToken`,
      {
        token,
      }
    );
    console.log('result: ', result.data);

    return result.data;
  } catch (error) {
    // console.log(error);
  }
};
