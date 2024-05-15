'use server';

import axios from 'axios';
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
} from '@/app/lib/cookie';
import { refreshTokenApi } from '@/services/auth/token';
import { deleteCookieApi } from '@/services/auth/cookie';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const serverInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    'Cache-Control': 'no-store',
  },
});

serverInstance.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;

    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// serverInstance.interceptors.response.use(
//   (response) => {
//     if (response.status === 404) console.log('404 Error');
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 401) {
//       const refreshToken = getRefreshToken();

//       // console.log(error);

//       // const response = NextResponse.redirect('/');

//       // return response;

//       const cookieStore = cookies();
//       cookieStore.delete('refreshToken');
//       // deleteTokens();
//       // console.log('401: ', refreshToken);
//       // await refreshTokenApi();
//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );
