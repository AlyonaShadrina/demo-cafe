/* eslint-disable no-console */
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { paths } from '../../../config';
import { clearToken, setToken } from '../../../utils/auth';
import getStringFromError from '../../../utils/getStringFromError';
import showNotification from '../../../utils/showNotification';
import * as types from './types';
import * as actions from './actions';
import * as actionsLayout from '../../layout/state/actions';
import * as api from '../api';

function* loginUser({ payload }) {
  try {
    const { values, history } = payload;

    const { data } = yield call(api.authenticate, values);

    yield put(
      actionsLayout.dialogSet({
        title: `Hello, ${data.user.firstName}!`,
        content: `It's great to see you:)`,
        timeout: 2000,
      }),
    );

    setToken(data.accessToken);

    yield put(actions.LoginSuccess(data));

    history.push('/');
  } catch (err) {
    console.error('loginUser', err);

    yield put(actions.LoginFailure(getStringFromError(err)));
  }
}

function* logoutRequest({ payload }) {
  try {
    const { history } = payload;

    yield call(api.logout);

    clearToken();

    yield put(actions.LogoutSuccess());

    history.push(paths.login);
  } catch (err) {
    console.error('logoutRequest', err);

    const errorMessage = getStringFromError(err);

    yield put(actions.LogoutFailure(errorMessage));
  }
}

function* getRefill() {
  try {
    const { data } = yield call(api.getRefill);

    yield put(actions.getRefillSuccess(data));

  } catch (err) {
    console.error('getRefill', err);
  }
}

function* getProfileRequest() {
  try {
    const { data } = yield call(api.getProfile);

    yield put(actions.getProfileSuccess(data));

    // initialize only after we have profile, as we will need id to connect to socket room
    yield put(actions.wsInitializeChannel());
  } catch (err) {
    console.error('getProfileRequest', err);

    const errorMessage = getStringFromError(err);

    yield put(actions.getProfileFailure(errorMessage));
  }
}

function* updateProfileRequest({ payload }) {
  try {
    const { callback, ...values } = payload;
    const { data } = yield call(api.updateProfile, values);

    if (callback) {
      callback();
    }

    yield put(actions.updateProfileSuccess(data));

    // yield put(showNotification('Profile updated.', 'success'));
  } catch (err) {
    console.error('updateProfileRequest', err);

    yield put(showNotification(getStringFromError(err), 'error'));
  }
}

function* addCardRequest({ payload }) {
  try {
    const { callback, successMessage, ...values } = payload;
    const { data } = yield call(api.addCard, values);

    if (callback) {
      callback();
    }

    yield put(actions.addCardSuccess(data));

    // yield put(
    //   actionsLayout.enqueueSnackbar({
    //     message: 'Card added.',
    //     options: {
    //       key: new Date().getTime() + Math.random(),
    //       variant: 'success',
    //     },
    //   }),
    // );
  } catch (err) {
    console.error('addCardRequest', err);

    yield put(
      actionsLayout.enqueueSnackbar({
        message: getStringFromError(err),
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      }),
    );
  }
}
function* editCardRequest({ payload }) {
  try {
    const { callback, successMessage, ...values } = payload;
    const { data } = yield call(api.editCard, values);

    if (callback) {
      callback();
    }

    yield put(actions.editCardSuccess(data));

    // yield put(
    //   actionsLayout.enqueueSnackbar({
    //     message: successMessage || 'Card updated.',
    //     options: {
    //       key: new Date().getTime() + Math.random(),
    //       variant: 'success',
    //     },
    //   }),
    // );
  } catch (err) {
    console.error('editCardRequest', err);

    yield put(
      actionsLayout.enqueueSnackbar({
        message: getStringFromError(err),
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      }),
    );
  }
}

function* deleteCardRequest({ payload }) {
  try {
    const { callback, ...values } = payload;
    const { data } = yield call(api.deleteCard, values);

    if (callback) {
      callback();
    }

    yield put(
      actionsLayout.enqueueSnackbar({
        message: 'Card deleted.',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }),
    );

    yield put(actions.deleteCardSuccess(data));
  } catch (err) {
    console.error('deleteCardRequest', err);

    yield put(
      actionsLayout.enqueueSnackbar({
        message: getStringFromError(err),
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      }),
    );
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(types.LOGIN_REQUEST, loginUser),
    takeEvery(types.LOGOUT_REQUEST, logoutRequest),
    takeEvery(types.GET_PROFILE_REQUEST, getProfileRequest),
    takeEvery(types.UPDATE_PROFILE_REQUEST, updateProfileRequest),
    takeEvery(types.DELETE_CARD_REQUEST, deleteCardRequest),
    takeEvery(types.EDIT_CARD_REQUEST, editCardRequest),
    takeEvery(types.ADD_CARD_REQUEST, addCardRequest),
    takeEvery(types.GET_REFILL_REQUEST, getRefill),
  ]);
}
