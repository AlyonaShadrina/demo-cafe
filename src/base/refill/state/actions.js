import * as types from './types';

export const getItemsRequest = payload => ({
  type: types.GET_ITEMS_REQUEST,
  payload,
});

export const getItemsSuccess = payload => ({
  type: types.GET_ITEMS_SUCCESS,
  payload,
});

export const postInvoiceRequest = payload => ({
  type: types.POST_INVOICE_REQUEST,
  payload,
});

export const postInvoiceSuccess = payload => ({
  type: types.POST_INVOICE_SUCCESS,
  payload,
});

export const getInvoiceRequest = payload => ({
  type: types.GET_INVOICE_REQUEST,
  payload,
});

export const getInvoiceSuccess = payload => ({
  type: types.GET_INVOICE_SUCCESS,
  payload,
});

export const postPaymentRequest = payload => ({
  type: types.POST_PAYMENT_REQUEST,
  payload,
});

export const confirmPasswordRequest = payload => ({
  type: types.CONFIRM_PASSWORD_REQUEST,
  payload,
});