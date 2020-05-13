import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    '& h2': {
      fontWeight: 'bold',
      fontSize: 20,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
  },
}));

const ButtonWithModal = ({
  title,
  content,
  submitLabel,
  onHandleSubmit,
  children,
  buttonProps,
  buttonIcon,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = e => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onHandleSubmit({ callback: handleClose });
  };

  return (
    <>
      {buttonIcon ? (
        <IconButton onClick={handleClickOpen} {...buttonProps}>
          {children}
        </IconButton>
      ) : (
        <Button onClick={handleClickOpen} {...buttonProps}>
          {children}
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xs">
        <DialogTitle
          id="form-dialog-title"
          classes={{
            root: classes.title,
          }}
        >
          {title}
        </DialogTitle>
        {content ? <DialogContent>{content}</DialogContent> : null}
        <DialogActions
          classes={{
            root: classes.actions,
          }}
        >
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            size="small"
            className="minWidth130"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            size="small"
            className="minWidth130"
          >
            {submitLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ButtonWithModal.defaultProps = {
  title: 'Are you sure?',
  content: null,
  submitLabel: 'Yes',
  buttonProps: {},
  buttonIcon: false,
};

ButtonWithModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  submitLabel: PropTypes.string,
  onHandleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonProps: PropTypes.shape({}),
  buttonIcon: PropTypes.bool,
};

export default ButtonWithModal;
