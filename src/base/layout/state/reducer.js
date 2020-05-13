import * as types from './types';

const initialState = {
  dialog: null,
  notifications: [],
};

const layoutReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.DIALOG_SET: {
      return { ...state, dialog: payload };
    }
    case types.DIALOG_REMOVE: {
      return { ...state, dialog: null };
    }

    case types.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case types.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification },
        ),
      };

    case types.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.key !== action.key),
      };

    default:
      return state;
  }
};

export default layoutReducer;
