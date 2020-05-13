import axios from 'axios';
import { removeToken } from '../base/profile/state/actions';
import { paths } from '../config';
import { clearToken } from '../utils/auth';

export default {
  setupInterceptors: (store, history) => {
    axios.interceptors.response.use(
      response => response,
      error => {
        const { status } = error.response;

        if (status === 401) {
          clearToken();
          store.dispatch(removeToken());
          history.push(paths.login);
        } else if (status === 404) {
          // history.push(`/error/${status}`);
        }

        return Promise.reject(error);
      },
    );
  },
};
