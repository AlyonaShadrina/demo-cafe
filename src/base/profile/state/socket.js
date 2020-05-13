import { all, call, takeLatest, take, put, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

import { BASE_URI } from '../../../config';
import getStringFromError from '../../../utils/getStringFromError';
import showNotification from '../../../utils/showNotification';
import * as actions from './actions';
import * as types from './types';

const connect = userId => {
  return io(BASE_URI, {
    // path: SOCKET_PATH,
    // transportOptions: `Bearer ${getToken()}`,
  })
    .on('connect', function() {
      this.emit('users', { action: 'JOIN', id: userId });
    })
    .on('disconnect', function() {
      this.emit('users', { action: 'LEAVE', id: userId });
    });
};

const socketEventHandlers = {
  profile: actions.wsProfileUpdated,
  timeRemaining: actions.wsTimeRemainig,
};

// This is how a channel is created
const createSocketChannel = socket =>
  eventChannel(emit => {
    const handler = action => data => {
      emit(action(data));
    };
    const setSocketEventListeners = method =>
      Object.keys(socketEventHandlers).forEach(event => {
        socket[method](event, handler(socketEventHandlers[event]));
      });

    setSocketEventListeners('on');

    return () => {
      setSocketEventListeners('off');
    };
  });

// saga that listens to the socket and puts the new data into the reducer
function* listenServerSaga() {
  // connect to the server
  const { profile } = yield select();
  const socket = yield call(connect, profile.user.id);

  // then create a socket channel
  const socketChannel = yield call(createSocketChannel, socket);

  // then put the new data into the reducer
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

function* wsProfileUpdated({ payload }) {
  try {
    yield put(actions.updateProfileSuccess(payload));
  } catch (err) {
    console.error('wsProfileUpdated', err);

    yield put(showNotification(getStringFromError(err), 'error'));
  }
}

function* wsTimeRemainig({ payload }) {
  try {
    const totalSeconds = payload.seconds;

    if (totalSeconds > 0) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(((totalSeconds % 3600) % 60) / 60);

      const isNegative = hours.toString(10).substr(0, 1) === '-';

      // If you want strings with leading zeroes:
      const stringMinutes = String(Math.abs(minutes)).padStart(2, '0');
      const stringHours = String(Math.abs(hours)).padStart(2, '0');
      const stringSeconds = String(Math.abs(seconds)).padStart(2, '0');

      const displayTime = `${
        isNegative ? '-' : ''
      }${stringHours}:${stringMinutes}:${stringSeconds}`;

      yield put(actions.setTimeRemainig(displayTime));
    } else {
      yield put(actions.setTimeRemainig('00:00:00'));
    }
  } catch (err) {
    console.error('wsTimeRemainig', err);

    yield put(showNotification(getStringFromError(err), 'error'));
  }
}

export default function* saga() {
  yield all([
    yield takeLatest(types.WS_INITIALIZE_CHANNEL, listenServerSaga),
    yield takeLatest(types.WS_PROFILE_UPDATED, wsProfileUpdated),
    yield takeLatest(types.WS_TIME_REMAINING, wsTimeRemainig),
  ]);
}
