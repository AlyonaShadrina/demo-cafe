import { Paper, Typography, Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import timeIcon from '../../../../assets/images/time.svg';
import printIcon from '../../../../assets/images/print.svg';
import * as selectors from '../../state/selectors';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconTime: {
    maxWidth: 40,
  },
  iconPrint: {
    maxWidth: 35,
  },
}));

const TimePrintsInfo = () => {
  const classes = useStyles();

  const timeRemaining = useSelector(selectors.timeRemaining);
  const { prints } = useSelector(selectors.profile);

  return (
    <Paper className={classes.container}>
      <Box mb={3}>
        <img src={timeIcon} alt="" className={classes.iconTime} />
        <Typography variant="h1" component="h2">
          <Box fontSize={26}>
            Time Remaining:
          </Box>
        </Typography>
        <Typography color="primary" className="accentFont">
          <Box fontSize={70} lineHeight={1}>
            {timeRemaining}
          </Box>
        </Typography>
      </Box>
      <img src={printIcon} alt="" className={classes.iconPrint} />
      <Typography variant="h1" component="h2">
        <Box fontSize={26}>
          Print Credits:
        </Box>
      </Typography>
      <Typography color="primary" className="accentFont">
        <Box fontSize={70} lineHeight={1}>
          {prints}
        </Box>
      </Typography>
    </Paper>
  );
};

export default TimePrintsInfo;
