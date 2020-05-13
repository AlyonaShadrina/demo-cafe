import { TextField } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';

import { MASK } from '../../../../config';
import Mask from '../../../_common/Mask';

const InputField = ({ field, touched, errors, values, handleChange, handleBlur, ...rest }) => (
  <TextField
    label={field.label}
    error={errors[field.name] && touched[field.name]}
    helperText={touched[field.name] && errors[field.name]}
    type={field.type}
    name={field.name}
    value={values[field.name]}
    fullWidth
    InputProps={{
      inputComponent: Mask,
    }}
    InputLabelProps={{
      classes: { root: 'inputLabelTextSmall' },
    }}
    /* eslint-disable-next-line react/jsx-no-duplicate-props */
    inputProps={{
      mask: MASK[field.name],
      onChange: handleChange,
      onBlur: handleBlur,
    }}
    FormHelperTextProps={{
      classes: {
        error: 'inputHelperTextAbsolute',
      },
    }}
    {...rest}
  />
);

InputField.defaultProps = {
  touched: {},
  errors: {},
  handleChange: () => null,
  handleBlur: () => null,
  values: {},
};

InputField.propTypes = {
  field: PropTypes.shape(PropTypes.any).isRequired,
  touched: PropTypes.shape(PropTypes.any),
  errors: PropTypes.shape(PropTypes.any),
  values: PropTypes.shape(PropTypes.any),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default InputField;
