import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundPosition: '15px 15px',
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const CheckboxRounded = props => {
  const classes = useStyles();
  return (
    <Checkbox
      color="primary"
      size="small"
      checkedIcon={<span className={`${classes.icon} ${classes.checkedIcon}`} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

export default CheckboxRounded;
