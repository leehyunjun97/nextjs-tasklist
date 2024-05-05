'use client';

import axios from 'axios';
import { getAccessTokenFromCookie } from './getCookie';

export const clientInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

clientInstance.interceptors.request.use((config) => {
  if (!config.headers) return config;

  // const accessToken = getAccessTokenFromCookie();

  // if (accessToken && config.headers) {
  //   config.headers['Authorization'] = `Bearer ${accessToken}`;
  // }

  return config;
});
