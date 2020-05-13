import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import successWhite from '../../../../assets/images/success-white.svg';

const useStyles = makeStyles(theme => ({
  dialogText: {
    fontSize: 16,
    color: 'white',
    maxWidth: 217,
    margin: 'auto',
    marginBottom: 40,
  },
}));

const DialogContentSuccessUpdate = () => {
  const classes = useStyles();
  return (
    <Box minWidth={250}>
      <img
        src={successWhite}
        alt=""
        style={{
          maxWidth: 50,
        }}
      />
      <Typography variant="h6" component="h2" color="secondary">
        <Box className="fontFamilyBook">SUCCESS!</Box>
      </Typography>
      <Typography className={classes.dialogText}>
        YOUR ACCOUNT WAS SUCCESSFULLY UPDATED
      </Typography>
    </Box>
  );
};

export default DialogContentSuccessUpdate;
