import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../../../assets/images/components/Logo';
import palette from '../../../../styles/palette';

import { dialogRemove } from '../../state/actions';
import { dialog } from '../../state/selectors';

const useStyles = makeStyles(theme => ({
  paper: ({ darkStyle }) => ({
    minHeight: 300,
    maxWidth: 300,
    paddingBottom: darkStyle ? 10 : '',
    justifyContent: darkStyle ? 'space-between' : 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: darkStyle ? theme.palette.primary.main : theme.palette.common.white,
    color: darkStyle ? theme.palette.common.white : theme.palette.secondary.main,
  }),
  title: ({ darkStyle }) => ({
    // fontWeight: 'bold',
    fontSize: darkStyle ? 16 : '',
  }),
  contentRoot: {
    flex: 'unset',
  },
  content: ({ darkStyle }) => ({
    maxWidth: darkStyle ? 'unset' : 140,
    margin: 'auto',
    lineHeight: 1.2,
  }),
}));

const AlertDialog = () => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const dialogContent = useSelector(dialog);

  const classes = useStyles({ darkStyle: dialogContent?.darkStyle });

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(dialogRemove());
    }, 500);
  };

  useEffect(() => {
    if (dialogContent) {
      setOpen(true);
      if (dialogContent.timeout) {
        setTimeout(() => {
          setOpen(false);
        }, dialogContent.timeout);
        setTimeout(() => {
          dispatch(dialogRemove());
        }, dialogContent.timeout + 500);
      }
    } else {
      setOpen(false);
    }
  }, [dialogContent, dispatch]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.paper,
      }}
    >
      {dialogContent?.darkStyle && (
        <Grid
          container
          justify="flex-end"
          alignItems="flex-start"
          component={Box}
          mb={2}
          p={3}
          pb={1}
        >
          {/*<IconButton*/}
          {/*  style={{*/}
          {/*    width: 48,*/}
          {/*    height: 48,*/}
          {/*    color: 'white',*/}
          {/*    fontSize: 20,*/}
          {/*    margin: -10,*/}
          {/*  }}*/}
          {/*  onClick={handleClose}*/}
          {/*>*/}
          {/*  x*/}
          {/*</IconButton>*/}
          <div>
            <Logo fill={palette.secondary.main}/>
          </div>
        </Grid>
      )}
      <DialogContent
        classes={{
          root: classes.contentRoot,
        }}
      >
        {dialogContent?.title && (
          <DialogTitle
            id="alert-dialog-title"
            color={dialogContent?.darkStyle ? 'inherit' : 'secondary'}
            disableTypography
          >
            <Typography variant="h6" component="h2" color="" className={`${classes.title} fontFamilyBook`}>
              {dialogContent.title}
            </Typography>
          </DialogTitle>
        )}
        <DialogContentText id="alert-dialog-description">
          <Typography color="primary" variant="h6" className={`${classes.content} fontFamilyBook`}>
            {dialogContent?.content}
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
