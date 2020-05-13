export const PROJECT_NAME = 'Thecafe';

export const BASE_URI = '';

export const BASE_API_URI = `${BASE_URI}/api/`;

export const SOCKET_PATH = '/socket.io';

const auth = {
  login: 'auth/login',
  logout: 'auth/logout',
  signup: 'auth/signup',
  profile: 'auth/me',
  verifyPassword: 'auth/verify-password',
  profilePatch: 'users',
};
const cards = {
  users: 'users',
  cards: 'cards',
};
const items = {
  items: 'items',
};
const invoices = {
  invoices: 'invoices',
  payments: 'payments',
};
const refills = {
  refills: 'refills',
};
export const API_URIS = {
  auth,
  cards,
  items,
  invoices,
  refills,
};

export const paths = {
  login: '/login',
  accountSetup: '/setup',
  addTime: '/refill',
  account: '/account',
  chat: '/chat',
  error: '/error',
  checkout: (invoiceId = ':invoiceId') => `/checkout/${invoiceId}`,
};

export const MASK = {
  cardNumber: [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  expMonth: [/\d/, /\d/],
  // expMonth: [/[01]/, /\d/],
  expYear: [/\d/, /\d/],
  cvc: [/\d/, /\d/, /\d/, /\d/],
  phone: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};

export const autoRefillOptions = [3600, 7200, 10800];
