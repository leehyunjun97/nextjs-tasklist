'use client';

import axios from 'axios';
import {
  deleteCookie,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
} from './getCookie';
import { fetchUserInfoApi } from '@/services/user/user';

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
    if (error.response.status === 403) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      window.location.href = '/';
      alert('잘못된 접근입니다.');
    }

    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);
