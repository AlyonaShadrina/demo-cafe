import {
  AppBar,
  Button,
  Toolbar,
  Container,
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import logo from '../../../assets/images/logo.svg';
import { paths } from '../../../config';
import * as actions from '../../profile/state/actions';
import * as selectors from '../../profile/state/selectors';
import * as actionsLayout from '../state/actions';

const useStyles = makeStyles(theme => ({
  link: {
    color: 'inherit',
    marginRight: theme.spacing(2),
    textTransform: 'uppercase',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  logout: {
    fontSize: 12,
    verticalAlign: 'initial',
  },
  nav: {
    // flexGrow: 1,
    justifyContent: 'center',
    minHeight: 50,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: 820,
  },
  logo: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(2),
    maxWidth: 20,
  },
  title: () => ({
    // fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    maxWidth: 165,
    margin: 'auto',
    marginBottom: 40,
  }),
  button: {
    color: 'white',
    borderColor: 'white',
  },
}));

const LogoutDialogContent = ({ closeDialog, logout }) => {
  const classes = useStyles();

  return (
    <Box minWidth={250}>
      <Typography variant="h6" component="h2" color="secondary">
        <Box className="fontFamilyBook">FOR REAL?</Box>
      </Typography>
      <Typography className={classes.title}>ARE YOU LEAVING ALREADY?</Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" onClick={logout} className={classes.button}>
            <Box fontSize={11}>Yes!</Box>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={closeDialog}
            style={{ paddingRight: 10, paddingLeft: 10 }}
          >
            <Box fontSize={11}>HMMM, NOT YET.</Box>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const Layout = ({ children }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const timeRemaining = useSelector(selectors.timeRemaining);

  const closeDialog = () => dispatch(actionsLayout.dialogRemove());

  const logout = () => {
    dispatch(actions.LogoutRequest({ history }));
    closeDialog();
  };

  const handleLogoutClick = () => {
    dispatch(
      actionsLayout.dialogSet({
        content: <LogoutDialogContent closeDialog={closeDialog} logout={logout} />,
        darkStyle: true,
      }),
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <nav>
            <Box pr={3} component="span" style={{ verticalAlign: 'middle' }}>
              <Typography variant="h1" component="span" color="secondary" className="accentFont">
                {timeRemaining.slice(0, -3) || '--'}
              </Typography>
            </Box>
            <NavLink to={paths.addTime} className={classes.link}>
              add Time
            </NavLink>
            <NavLink to={paths.account} className={classes.link}>
              account
            </NavLink>
            <NavLink to={paths.chat} className={classes.link}>
              chat
            </NavLink>
            <Button
              color="inherit"
              className={`${classes.logout} fontFamilyLight`}
              onClick={handleLogoutClick}
            >
              Log out
            </Button>
            <img src={logo} alt="" className={classes.logo} />
          </nav>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        {children}
      </Container>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
