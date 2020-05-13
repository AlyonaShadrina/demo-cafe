import * as actionsLayout from '../base/layout/state/actions';

const showNotification = (text = '', variant = 'info') =>
  actionsLayout.enqueueSnackbar({
    message: text,
    options: {
      key: new Date().getTime() + Math.random(),
      variant,
    },
  });

export default showNotification;
