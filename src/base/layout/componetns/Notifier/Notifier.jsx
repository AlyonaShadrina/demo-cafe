import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeSnackbar } from '../../state/actions';

const Notifier = () => {
  const { notifications } = useSelector(state => state.ui);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const [displayed, setDisplayed] = useState([]);

  const storeDisplayed = id => {
    setDisplayed(oldArr => [...oldArr, id]);
  };

  useEffect(() => {
    if (!notifications.length) {
      setDisplayed([]);
    }

    let notExists = false;
    for (let i = 0; i < notifications.length; i += 1) {
      const newSnack = notifications[i];
      if (newSnack.dismissed) {
        closeSnackbar(newSnack.key);
        // removeSnackbar(newSnack.key);
      }

      // eslint-disable-next-line no-continue
      if (notExists) continue;
      notExists = notExists || !notifications.filter(({ key }) => newSnack.key === key).length;
    }

    notifications.forEach(({ key, message, options = {} }) => {
      // Do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;
      // Display snackbar using notistack
      enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, keyN) => {
          if (options.onClose) {
            options.onClose(event, reason, keyN);
          }
          // Dispatch action to remove snackbar from redux store
          removeSnackbar(keyN);
        },
      });
      // Keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar]);

  return null;
};

export default Notifier;
