import axios from 'axios';

import { API_URL } from './constants';

export const publicAxios = axios.create({
  baseURL: API_URL,
});

export const privateAxios = axios.create({
  baseURL: API_URL,
});
