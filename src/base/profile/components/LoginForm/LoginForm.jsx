import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Link,
  makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';

import Sprite from '../../../../assets/images/sprite.svg';
import { MASK } from '../../../../config';
import SvgSymbol from '../../../_common/InlineSvg';
import Mask from '../../../_common/Mask';
import { profileError } from '../../state/selectors';
import { login } from '../../../../validation/auth';
import LoginLayout from '../LoginLayout';

const useStyles = makeStyles(theme => ({
  input: {
    '& input, & label': {
      color: theme.palette.primary.main,
    },
  },
}));

const LoginForm = ({ handleSubmit }) => {
  const classes = useStyles();

  const error = useSelector(profileError).login;

  const [showPass, setShowPass] = useState(false);

  const togglePass = () => setShowPass(!showPass);

  const endAdornment = (
    <IconButton aria-label="show password" size="small" onClick={togglePass}>
      <SvgSymbol
        path={Sprite}
        iconName={showPass ? 'hidePass' : 'showPass'}
        width="20"
        height="20"
        fill="grey"
      />
    </IconButton>
  );
  const formik = useFormik({
    initialValues: {
      password: '',
      phone: '',
    },
    onSubmit: values => {
      const valuesToSend = { ...values };
      if (!valuesToSend.password) {
        delete valuesToSend.password;
      }
      handleSubmit(valuesToSend);
    },
    validationSchema: login,
  });

  const { errors, touched, values, handleChange, handleBlur } = formik;

  const fields = [
    {
      label: 'Phone Number',
      name: 'phone',
      inputProps: {
        mask: MASK.phone,
        classes: classes.input,
        autoComplete: 'off',
      },
      InputProps: {
        inputComponent: Mask,
        classes: classes.input,
        autoComplete: 'off',
      },
    },
    {
      label: 'Password',
      name: 'password',
      type: showPass ? 'text' : 'password',
      InputProps: {
        endAdornment,
        autoComplete: 'new-password',
      },
      inputProps: {
        mask: MASK.phone,
        autoComplete: 'new-password',
      },
    },
  ];

  return (
    <LoginLayout>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justify="center" alignItems="center" direction="column">
          {fields.map(field => {
            const { name, label, ...rest } = field;
            return (
              <TextField
                margin="normal"
                fullWidth
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                key={name}
                name={name}
                label={`${label} ${touched[name] && errors[name] ? `(${errors[name]})` : ''}`}
                error={touched[name] && errors[name]}
                value={values[name]}
                classes={{
                  root: classes.input,
                }}
                className={classes.input}
                {...rest}
              />
            );
          })}
          <Typography color="error">
            <Box style={{ height: 20 }} fontSize={10} textAlign="center">
              {error}
            </Box>
          </Typography>
          <Box mt={4} mb={1} fontSize={10} textAlign="center">
            By clicking submit you agree to the
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link color="inherit" style={{ textDecoration: 'underline' }}>
              {` terms and conditions`}
            </Link>
          </Box>
          <Box mb={2} width="100%">
            <Button type="submit" fullWidth color="primary" variant="contained">
              Login
            </Button>
          </Box>
          <Button type="submit" fullWidth color="secondary" variant="contained" disabled>
            Refill my account
          </Button>
        </Grid>
      </form>
    </LoginLayout>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
