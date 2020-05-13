import { post, get, patch, del } from '../../../api';
import { API_URIS } from '../../../config';

export const authenticate = (values, data) => post(API_URIS.auth.login, values, data);

export const logout = () => post(API_URIS.auth.logout);

export const getProfile = () => get(API_URIS.auth.profile);

export const getRefill = () => get(API_URIS.refills.refills);

export const updateProfile = ({ id, data }) => patch(`${API_URIS.auth.profilePatch}/${id}`, data);

export const addCard = ({ userId, data }) =>
  post(`${API_URIS.cards.users}/${userId}/${API_URIS.cards.cards}`, data);

export const editCard = ({ cardId, userId, data }) =>
  patch(`${API_URIS.cards.users}/${userId}/${API_URIS.cards.cards}/${cardId}`, data);

export const deleteCard = ({ cardId, userId }) =>
  del(`${API_URIS.cards.users}/${userId}/${API_URIS.cards.cards}/${cardId}`);
