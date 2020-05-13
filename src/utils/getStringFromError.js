import { notifications } from '../dictionary';

const getStringFromError = errorObj => {
  const { response } = errorObj;

  if (response && response.data) {
    const { error, message } = response.data;

    if (message && typeof message === 'string') {
      return message;
    }

    if (message && Array.isArray(message)) {
      return message.join('. ');
    }

    if (error) {
      return error;
    }
  }

  return notifications.errors.default;
};

export default getStringFromError;
