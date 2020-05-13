import axios from 'axios';
import { BASE_API_URI } from '../config';
import { getToken } from '../utils/auth';

const request = (method, path, data = {}) => {
  const token = getToken();

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({
    method,
    url: BASE_API_URI + path,
    data,
    headers,
  });
};

export const get = path => request('get', path);

export const post = (path, data) => request('post', path, data);

export const del = path => request('delete', path);

export const put = (path, data) => request('put', path, data);

export const patch = (path, data) => request('patch', path, data);
