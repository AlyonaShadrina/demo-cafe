/* eslint-disable no-nested-ternary */
import { Grid, Box, Chip, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { TypeItem } from '../../../../types';

const useStyles = makeStyles(theme => ({
  container: ({ value, lightStyle }) => ({
    height: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: value
      ? theme.palette.common.white
      : lightStyle
      ? 'transparent'
      : theme.palette.grey['100'],
    border: `1px solid ${
      value ? theme.palette.primary.main : lightStyle ? theme.palette.grey.A200 : 'transparent'
    }`,
    cursor: 'pointer',
    borderRadius: 5,
    boxShadow: `0px -4px 0px 1px ${
      value ? theme.palette.primary.main : lightStyle ? 'transparent' : theme.palette.grey['100']
    }`,
    textTransform: 'uppercase',
  }),
  chip: ({ value, lightStyle }) => ({
    fontSize: 10,
    borderRadius: 8,
    height: 20,
    width: '80%',
    cursor: 'pointer',
    color: value ? theme.palette.common.white : theme.palette.primary.main,
    backgroundColor: value
      ? theme.palette.primary.main
      : lightStyle
      ? theme.palette.primary.light
      : theme.palette.common.white,
  }),
}));

const RefillItem = ({ item, checked, handleClick, lightStyle, name }) => {
  const classes = useStyles({ value: checked, lightStyle });

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      component="label"
      className={classes.container}
    >
      <input
        name={name}
        type="radio"
        value={item.id}
        checked={checked}
        onClick={handleClick}
        style={{
          opacity: 0,
          position: 'absolute',
        }}
      />
      <Typography
        color="primary"
        className="accentFont"
        component={Box}
        fontSize="40px !important"
        lineHeight="1 !important"
      >
        {item.name.split(' ')[0]}
      </Typography>
      <Typography color="primary" component={Box} lineHeight="1 !important">
        {item.name.split(' ')[1]}
      </Typography>
      <Typography
        variant="h1"
        component={Box}
        lineHeight="1.3 !important"
        fontSize="25px !important"
      >
        <span className="fontFamilyLight">$</span>
        <span className="fontFamilyBook fontWeightBold">{item.price}</span>
      </Typography>
      <Chip size="small" label="CHOOSE" className={`${classes.chip} fontFamilyBook`} />
    </Grid>
  );
};

RefillItem.defaultProps = {
  lightStyle: false,
};

RefillItem.propTypes = {
  item: TypeItem.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  lightStyle: PropTypes.bool,
};

export default RefillItem;
