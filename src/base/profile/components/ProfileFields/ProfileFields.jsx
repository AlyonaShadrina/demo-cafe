import { TextField } from '@material-ui/core';
import React from 'react';
import * as PropTypes from 'prop-types';

import nameToLabel from '../../../../utils/nameToLabel';
import CardsListContainer from '../../containers/CardListContainer';
import AutoRefill from './AutoRefill';

const ProfileFields = ({ initialValues, errors, values, handleChange, disableAll }) => {
  return (
    <>
      {Object.keys(initialValues).map(key => {
        if (key === 'autoRefill') {
          return (
            <AutoRefill key={key} values={values} errors={errors} handleChange={handleChange} />
          );
        }
        if (key !== 'cards' && key !== 'autoRefillCheck' && key !== 'refillId') {
          return (
            <TextField
              key={key}
              margin="normal"
              label={nameToLabel(key)}
              name={key}
              fullWidth
              onChange={handleChange}
              value={values[key]}
              error={errors[key]}
              helperText={errors[key]}
              FormHelperTextProps={{
                classes: {
                  error: 'inputHelperTextAbsolute',
                },
              }}
              type={key === 'password' ? 'password' : 'text'}
              disabled={disableAll || key === 'phone'}
              inputProps={{
                autoComplete:
                  // eslint-disable-next-line no-nested-ternary
                  key === 'password' ? 'new-password' : key === 'email' ? 'email' : 'off',
              }}
            />
          );
        }
        return null;
      })}
      <CardsListContainer />
    </>
  );
};

ProfileFields.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ProfileFields;
