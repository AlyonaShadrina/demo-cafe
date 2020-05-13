import { Grid } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import RefillItem from './RefillItem';
import { TypeItem } from '../../../../types';

const RefillItemsList = ({ items, values, setFieldValue, lightStyle, name }) => {
  // we do it on click to be able uncheck radio
  const handleClick = e => {
    const targetValue = parseInt(e.target.value, 10);
    if (values[name] === targetValue) {
      setFieldValue(name, null);
    } else {
      setFieldValue(name, targetValue);
    }
  };

  return (
    <Grid container spacing={2} justify="flex-end">
      {items?.map(item => (
        <Grid item xs={6} md={3} key={item.id}>
          <RefillItem
            item={item}
            name={name}
            checked={values[name] === item.id}
            handleClick={handleClick}
            lightStyle={lightStyle}
          />
        </Grid>
      ))}
    </Grid>
  );
};

RefillItemsList.defaultProps = {
  lightStyle: false,
  values: {},
};

RefillItemsList.propTypes = {
  items: PropTypes.arrayOf(TypeItem).isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.shape(PropTypes.any),
  setFieldValue: PropTypes.func.isRequired,
  lightStyle: PropTypes.bool,
};

export default RefillItemsList;
