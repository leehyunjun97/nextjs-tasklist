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
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
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
      alert('잘못된 접근입니다.');
    }

    // 액세스 토큰 만료
    if (error.response.status === 401) {
      const refreshToken = getRefreshTokenFromCookie();
      // 리프레시 토큰도 만료 되었을 떄
      if (!refreshToken) {
        alert('정보가 만료되었습니다. 로그인을 다시 해주세요');
        return;
      }

      const vaildResult = await isVaildTokenApi('Bearer ' + refreshToken);

      // 리프레시 토큰이 조작 되었을 때
      if (vaildResult.status === 403) {
        deleteCookie('refreshToken');
        return;
      }

      if (vaildResult.status === 201) {
        // 재발급
        await refreshTokenApi();
        const accessToken = getAccessTokenFromCookie();
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
        const response = await axios.request(error.config);
        return response;
      }
    }
    return Promise.reject(error);
  }
);
