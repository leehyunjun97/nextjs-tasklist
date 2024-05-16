'use client';

import axios from 'axios';
import {
  deleteCookie,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
} from './getCookie';
import { isVaildTokenApi, refreshTokenApi } from '@/services/auth/token';

export const clientInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

clientInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers) return config;

    const accessToken = getAccessTokenFromCookie();

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

clientInstance.interceptors.response.use(
  (response) => {
    if (response.status === 404) console.log('404 Error');
    return response;
  },
  async (error) => {
    // 액세스 토큰 만료
    if (error.response.status === 401) {
      const refreshToken = getRefreshTokenFromCookie();

      // 리프레시 토큰도 만료 되었을 떄
      if (!refreshToken) return;

      const vaildResult = await isVaildTokenApi(refreshToken);

      // 재발급
      if (vaildResult.status === 201) {
        await refreshTokenApi();
        const accessToken = getAccessTokenFromCookie();
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
        const response = await axios.request(error.config);
        return response;
      } else {
        deleteCookie('refreshToken');
      }
    }
    return Promise.reject(error);
  }
);
