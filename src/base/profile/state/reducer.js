import { getToken } from '../../../utils/auth';
import * as types from './types';

const initialState = {
  loading: false,
  errors: {},
  accessToken: getToken(),
  user: {},
  timeRemaining: '--',
  refill: [],
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REMOVE_TOKEN: {
      return { ...state, accessToken: null };
    }
    case types.LOGIN_REQUEST: {
      return { ...state, loading: true, errors: false };
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        ...payload,
        timeRemaining: payload.user.time,
        loading: false,
        errors: false,
      };
    }
    case types.LOGIN_FAILURE: {
      return { ...state, errors: { login: payload }, loading: false };
    }

    case types.LOGOUT_REQUEST: {
      return { ...state, loading: true };
    }
    case types.LOGOUT_SUCCESS: {
      return { ...state, ...payload, timeRemaining: initialState.timeRemaining, loading: false };
    }
    case types.LOGOUT_FAILURE: {
      return { ...state, errors: payload, loading: false };
    }

    case types.GET_PROFILE_REQUEST: {
      return { ...state, loading: true };
    }
    case types.GET_PROFILE_SUCCESS: {
      return { ...state, user: payload, timeRemaining: payload.time, loading: false };
    }

    case types.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, ...payload },
        timeRemaining: payload.time,
        errors: false,
        loading: false,
      };
    }

    case types.DELETE_CARD_SUCCESS:
    case types.EDIT_CARD_SUCCESS:
    case types.ADD_CARD_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          cards: payload,
        },
        errors: false,
        loading: false,
      };
    }

    case types.DELETE_CARD_FAILURE:
    case types.UPDATE_PROFILE_FAILURE: {
      return { ...state, errors: payload, loading: false };
    }
    case types.SET_TIME_REMAINING: {
      return { ...state, timeRemaining: payload };
    }

    case types.GET_REFILL_SUCCESS: {
      return { ...state, refill: payload };
    }

    default:
      return state;
  }
};

export default authReducer;
