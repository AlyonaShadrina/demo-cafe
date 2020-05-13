import { combineReducers } from 'redux';
import authReducer from '../base/profile/state/reducer';
import layoutReducer from '../base/layout/state/reducer';
import refillReducer from '../base/refill/state/reducer';

const reducers = combineReducers({
  profile: authReducer,
  ui: layoutReducer,
  refill: refillReducer,
});

export default reducers;
