'use client';

import axios from 'axios';
import { getAccessTokenFromCookie } from './getCookie';

export const clientInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { 'Cache-Control': 'no-cache' },
});

clientInstance.interceptors.request.use(
  (config) => {
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
    if (error.response.status === 401) {
      console.log('그 뭐야 401입니다');
    }
  }
);
