import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import * as PropTypes from 'prop-types';

import colors from '../../styles/colors';

const useStyles = makeStyles(theme => ({
  success: {
    background: colors.green,
  },
  error: {
    background: theme.palette.error.main,
  },
  warning: {
    background: theme.palette.error.main,
  },
  info: {
    background: theme.palette.primary.main,
  },
}));

const NotificationProvider = ({ children }) => {
  const classes = useStyles();

  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
      }}
      action={key => (
        <Button onClick={onClickDismiss(key)} color="inherit">
          x
        </Button>
      )}
      ref={notistackRef}
    >
      {children}
    </SnackbarProvider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
