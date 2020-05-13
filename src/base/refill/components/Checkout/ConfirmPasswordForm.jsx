import { Box, Button, Input } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../../state/actions';

const ConfirmPasswordForm = ({ callback }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: values => {
      dispatch(actions.confirmPasswordRequest({ values, callback }));
    },
  });

  const { values, handleSubmit, handleChange } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={1}>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          style={{ backgroundColor: 'white', padding: 4, borderRadius: 4, color: 'black' }}
          disableUnderline
          fullWidth
        />
      </Box>
      <Button type="sumbit" fullWidth variant="contained" color="secondary">
        confirm
      </Button>
    </form>
  );
};

export default ConfirmPasswordForm;
