'use client';

import { getAccessTokenFromCookie } from '@/utils/getCookie';
import axios from 'axios';
import getCookie from './cookie';

// export const publicInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
// });

export const privateInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

privateInstance.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;

    const a = document.cookie;

    console.log(a);

    const accessToken = getAccessTokenFromCookie();

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// privateInstance.interceptors.request.use((config) => {
//   const auth_header = config.headers['x-auth-not-required'];
//   if (auth_header) return config;

//   const token = getCookie('token');
//   config.headers['Authorization'] = `Bearer ${token}`;

//   return config;
// });
