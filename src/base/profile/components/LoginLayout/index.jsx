import { Grid, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import * as PropTypes from 'prop-types';

import logoBlue from '../../../../assets/images/logo-blue.svg';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: 1020,
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(5),
    width: 362,
    maxWidth: 362,
    margin: 'auto',
  },
  logo: {
    marginBottom: theme.spacing(17),
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container justify="space-evenly" alignItems="center" className={classes.container}>
      <Grid item xs={4}>
        <Box>
          <Typography color="secondary" component="h1">
            <Box
              fontSize={80}
              textAlign="center"
              lineHeight={1.3}
              maxWidth={280}
              margin="auto"
              className="accentFont"
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              LET'S GET SOMETHING DONE!
            </Box>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper} elevation={0}>
          <img src={logoBlue} alt="The cafe logo" className={classes.logo} />
          {children}
        </Paper>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
