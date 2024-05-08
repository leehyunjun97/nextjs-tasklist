'use client';

import axios from 'axios';
import {
  deleteCookie,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
} from './getCookie';

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
  (error) => {
    // 토큰 조작
    if (error.response.status === 403) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      // 리다이렉트 어떻게 하는지
      window.location.href = '/';
      alert('잘못된 접근입니다.');
    }

    // 액세스 토큰 만료
    if (error.response.status === 401) {
      const refreshToken = getRefreshTokenFromCookie();

      if (!refreshToken) window.location.href = '/';

      


    }
    return Promise.reject(error);
  }
);
