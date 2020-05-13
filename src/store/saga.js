import { all, spawn } from 'redux-saga/effects';
import authSaga from '../base/profile/state/saga';
import socketSaga from '../base/profile/state/socket';
import refillSaga from '../base/refill/state/saga';

export default function* rootSaga() {
  yield all([spawn(authSaga), spawn(refillSaga), spawn(socketSaga)]);
}
