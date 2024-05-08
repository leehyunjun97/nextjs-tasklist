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
  async (error) => {
    // 토큰 조작
    if (error.response.status === 403) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      window.location.href = '/';
      alert('잘못된 접근입니다.');
    }

    // 액세스 토큰 만료
    if (error.response.status === 401) {
      console.log('비용삐뵤ㅇ용');

      const refreshToken = getRefreshTokenFromCookie();
      console.log(refreshToken);

      // const vaildResult = await isVaildTokenApi(refreshToken);

      // console.log(vaildResult);
    }
    return Promise.reject(error);
  }
);
