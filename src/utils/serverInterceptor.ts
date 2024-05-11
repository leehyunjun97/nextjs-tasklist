'use server';

import axios from 'axios';
import { getAccessToken, getRefreshToken } from '@/app/lib/cookie';
import { NextResponse } from 'next/server';

export const serverInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
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
      let response = NextResponse.redirect(new URL('/', error.config.url));
      // response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    if (error.response.status === 401) {
      const refreshToken = getRefreshToken();
      console.log('401: ', refreshToken);

      // 일단 테스트
      // await refreshTokenApi();
    }
  }
);
