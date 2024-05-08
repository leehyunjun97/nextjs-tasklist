'use server';

import axios from 'axios';
import { deleteTokens, getAccessToken } from '@/app/lib/cookie';

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
    console.log('정상입니다');

    if (response.status === 404) console.log('404 Error');
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      console.log('403');

      deleteTokens();
      error.response.redirect('/');
      return error.response;
    }
    if (error.response.status === 401) {
      console.log('401');
    }
  }
);
