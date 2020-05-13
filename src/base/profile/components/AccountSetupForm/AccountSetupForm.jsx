import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import * as PropTypes from 'prop-types';
import React from 'react';

import nameToLabel from '../../../../utils/nameToLabel';
import { profileSetup } from '../../../../validation/profile';
import cropText from '../../../../utils/cropText';

const AccountSetupForm = ({ initial, submit }) => {
  const formik = useFormik({
    initialValues: initial,
    onSubmit: submit,
    validationSchema: profileSetup,
    enableReinitialize: true,
  });

  const { errors, dirty, values, handleChange, handleBlur, initialValues, touched } = formik;
  return (
    <Grid container justify="center" alignItems="center" component={Box} minHeight="100vh">
      <Paper component={Box} maxWidth={350} padding={4}>
        <Box mb={2}>
          <Typography variant="h1">Account Setup</Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          {Object.keys(initialValues).map(key => {
            return (
              <TextField
                key={key}
                margin="normal"
                label={nameToLabel(key === 'password' ? 'createPassword' : key)}
                name={key}
                fullWidth
                value={values[key]}
                error={touched[key] && !!errors[key]}
                helperText={touched[key] && cropText(errors[key], 50)}
                type={key.toLowerCase().includes('password') ? 'password' : 'text'}
                FormHelperTextProps={{
                  classes: {
                    error: 'inputHelperTextAbsolute',
                  },
                }}
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur,
                  autoComplete:
                    // eslint-disable-next-line no-nested-ternary
                    key === 'password' ? 'new-password' : key === 'email' ? 'email' : 'off',
                }}
              />
            );
          })}
          <Box marginTop={3}>
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              disabled={!dirty || !!Object.keys(errors).length}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

AccountSetupForm.propTypes = {
  initial: PropTypes.shape(PropTypes.any).isRequired,
  submit: PropTypes.func.isRequired,
};

export default AccountSetupForm;
