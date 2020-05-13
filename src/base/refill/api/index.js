import { get, post } from '../../../api';
import { API_URIS } from '../../../config';

export const getItems = () => get(API_URIS.items.items);

export const postInvoice = data => post(API_URIS.invoices.invoices, data);

export const getInvoice = id => get(`${API_URIS.invoices.invoices}/${id}`);

export const postPayment = ({ invoiceId, data }) =>
  post(`${API_URIS.invoices.invoices}/${invoiceId}/payments`, data);

export const verifyPassword = data => post(API_URIS.auth.verifyPassword, data);
