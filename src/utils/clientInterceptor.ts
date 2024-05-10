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
  headers: { 'Cache-Control': 'no-cache' },
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
    // 토큰이 조작되었을 시
    if (error.response.status === 403) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      window.location.href = '/';
      alert('잘못된 접근입니다.');
    }

    // 액세스 토큰 만료
    if (error.response.status === 401) {
      const refreshToken = getRefreshTokenFromCookie();

      if (!refreshToken) {
        window.location.href = '/';
        return error;
      }

      const vaildResult = await isVaildTokenApi('Bearer ' + refreshToken);

      if (vaildResult.status === 403) {
        deleteCookie('refreshToken');
        window.location.href = '/';
        alert('잘못된 접근입니다.');
        return error;
      }

      if (vaildResult.status === 201) {
        // 재발급
        await refreshTokenApi();

        const accessToken = getAccessTokenFromCookie();

        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.request(error.config);
        return response;
      }
    }
    return Promise.reject(error);
  }
);
