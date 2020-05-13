import * as types from './types';

export const removeToken = () => ({
  type: types.REMOVE_TOKEN,
});

export const wsInitializeChannel = () => ({ type: types.WS_INITIALIZE_CHANNEL });

export const LoginRequest = payload => ({
  type: types.LOGIN_REQUEST,
  payload,
});

export const LoginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const LoginFailure = payload => ({
  type: types.LOGIN_FAILURE,
  payload,
});

export const LogoutRequest = payload => ({
  type: types.LOGOUT_REQUEST,
  payload,
});

export const LogoutSuccess = payload => ({
  type: types.LOGOUT_SUCCESS,
  payload,
});

export const LogoutFailure = payload => ({
  type: types.LOGOUT_FAILURE,
  payload,
});

export const getProfileRequest = payload => ({
  type: types.GET_PROFILE_REQUEST,
  payload,
});

export const getProfileSuccess = payload => ({
  type: types.GET_PROFILE_SUCCESS,
  payload,
});

export const getRefillRequest = payload => ({
  type: types.GET_REFILL_REQUEST,
  payload,
});

export const getRefillSuccess = payload => ({
  type: types.GET_REFILL_SUCCESS,
  payload,
});

export const getProfileFailure = payload => ({
  type: types.GET_PROFILE_FAILURE,
  payload,
});

export const updateProfileRequest = payload => ({
  type: types.UPDATE_PROFILE_REQUEST,
  payload,
});

export const updateProfileSuccess = payload => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileFailure = payload => ({
  type: types.UPDATE_PROFILE_FAILURE,
  payload,
});

export const addCardRequest = payload => ({
  type: types.ADD_CARD_REQUEST,
  payload,
});

export const addCardSuccess = payload => ({
  type: types.ADD_CARD_SUCCESS,
  payload,
});

export const editCardRequest = payload => ({
  type: types.EDIT_CARD_REQUEST,
  payload,
});

export const editCardSuccess = payload => ({
  type: types.EDIT_CARD_SUCCESS,
  payload,
});

export const deleteCardRequest = payload => ({
  type: types.DELETE_CARD_REQUEST,
  payload,
});

export const deleteCardSuccess = payload => ({
  type: types.DELETE_CARD_SUCCESS,
  payload,
});

export const wsProfileUpdated = payload => ({
  type: types.WS_PROFILE_UPDATED,
  payload,
});

export const wsTimeRemainig = payload => ({
  type: types.WS_TIME_REMAINING,
  payload,
});

export const setTimeRemainig = payload => ({
  type: types.SET_TIME_REMAINING,
  payload,
});
