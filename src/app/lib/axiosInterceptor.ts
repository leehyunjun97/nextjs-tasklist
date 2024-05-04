'use client';

import { getAccessToken } from '@/utils/getCookie';
import axios from 'axios';

export const publicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

privateInstance.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;

    // const accessToken = getAccessToken();

    // if (accessToken && config.headers) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);
