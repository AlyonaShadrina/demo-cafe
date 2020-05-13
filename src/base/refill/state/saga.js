/* eslint-disable no-console */
import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import getStringFromError from '../../../utils/getStringFromError';
import showNotification from '../../../utils/showNotification';

import * as types from './types';
import * as actions from './actions';
import * as actionsProfile from '../../profile/state/actions';
import * as api from '../api';
import * as apiProfile from '../../profile/api';

function* getItemsRequest() {
  try {
    const {
      data: { TIME, PACKAGES },
    } = yield call(api.getItems);

    yield put(actions.getItemsSuccess({ TIME, PACKAGES }));
  } catch (err) {
    console.error('getItemsRequest', err);
  }
}

function* postInvoiceRequest({ payload }) {
  try {
    const { data } = yield call(api.postInvoice, payload.data);

    payload.callback(data.id);

    // yield put(actions.postInvoiceSuccess());
  } catch (err) {
    console.error('postInvoiceRequest', err);
  }
}

function* getInvoiceRequest({ payload }) {
  try {
    const { data } = yield call(api.getInvoice, payload);

    // console.log('data', data);

    yield put(actions.getInvoiceSuccess(data));
  } catch (err) {
    console.error('getInvoiceRequest', err);
  }
}

function* postPaymentRequest({ payload }) {
  try {
    const { cardNumber, userId, invoiceId, callback, ...rest } = payload;

    // we need to get profile cards before posting new
    // because of sockets listens for profile updates
    const { profile } = yield select();

    if (!rest.cardId) {
      const { expMonth, expYear, cvc, setDefault } = rest;

      const { data } = yield call(apiProfile.addCard, {
        userId,
        data: {
          cardNumber,
          expMonth: parseInt(expMonth, 10),
          expYear: parseInt(`20${expYear}`, 10),
          cvc,
          setDefault: setDefault || false,
        },
      });

      yield put(showNotification('New card added.', 'success'));

      // very important part to pay from right card
      const newCard = data.filter(
        ({ id: id1 }) => !profile.user.cards.some(({ id: id2 }) => id2 === id1),
      );

      yield call(api.postPayment, {
        data: {
          amount: rest.amount,
          method: rest.method,
          cardId: newCard[0].id,
        },
        invoiceId,
      });

      yield put(actionsProfile.addCardSuccess(data));
    } else {
      yield call(api.postPayment, { data: rest, invoiceId });
    }

    if (callback) {
      callback();
    }

    // if there was no time, backend closed ws connection. we need reinit it
    if (profile.timeRemaining === '00:00:00') {
      yield put(actionsProfile.wsInitializeChannel());
    }

    yield put(showNotification('Payed!', 'success'));
  } catch (err) {
    console.error('postPaymentRequest', err);

    yield put(showNotification(getStringFromError(err), 'error'));
  }
}

function* confirmPasswordRequest({ payload }) {
  try {
    const { values, callback } = payload;

    const { data } = yield call(api.verifyPassword, values);

    if (data.success) {
      if (callback) {
        callback();
      }
    } else {
      yield put(showNotification('Wrong password', 'error'));
    }
  } catch (err) {
    console.error('confirmPasswordRequest', err);

    yield put(showNotification(getStringFromError(err), 'error'));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(types.GET_ITEMS_REQUEST, getItemsRequest),
    takeEvery(types.POST_INVOICE_REQUEST, postInvoiceRequest),
    takeEvery(types.GET_INVOICE_REQUEST, getInvoiceRequest),
    takeEvery(types.POST_PAYMENT_REQUEST, postPaymentRequest),
    takeEvery(types.CONFIRM_PASSWORD_REQUEST, confirmPasswordRequest),
  ]);
}
