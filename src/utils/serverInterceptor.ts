'use server';

import axios from 'axios';
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
} from '@/app/lib/cookie';
import { refreshTokenApi } from '@/services/auth/token';
import { deleteCookieApi } from '@/services/auth/cookie';

export const serverInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    // 'Cache-Control': 'no-cache',
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

serverInstance.interceptors.response.use(
  (response) => {
    if (response.status === 404) console.log('404 Error');
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      console.log('403: ');

      await deleteCookieApi();
    }

    if (error.response.status === 401) {
      const refreshToken = getRefreshToken();
      console.log('401: ', refreshToken);
      await refreshTokenApi();
    }
  }
);
