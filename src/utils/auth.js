// import decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { PROJECT_NAME } from '../config';

export const getToken = () => Cookies.get(PROJECT_NAME);
export const setToken = token => {
  // const expires = new Date().toGMTString(decode(token).exp + 100000);
  Cookies.set(PROJECT_NAME, token);
};

export const clearToken = () => Cookies.remove(PROJECT_NAME);
