import * as types from './types';

const initialState = {
  data: {
    TIME: [],
    PACKAGES: [],
  },
  checkout: {},
  loading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ITEMS_REQUEST: {
      return { ...state, loading: true };
    }
    case types.GET_ITEMS_SUCCESS: {
      return { ...state, data: payload, loading: false };
    }

    case types.GET_INVOICE_SUCCESS: {
      return { ...state, checkout: payload };
    }

    default:
      return state;
  }
};

export default reducer;
