import * as PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AccountSetup from '../AccountSetup';

import { getToken } from '../../utils/auth';
import ProfileContext from '../../providers/ProfileProvider/ProfileContext';
import Loading from '../../base/_common/Loading';
import { paths } from '../../config';

/**
 *  If account missing required fields, it will redirect to AccountSetup
 */

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getToken();

  const { isLoggedIn, profile } = useContext(ProfileContext);

  if (!token) {
    return <Redirect {...rest} to={paths.login} />;
  }
  if (!isLoggedIn) {
    return <Loading />;
  }
  const { firstName, lastName, address, email, isSingleUse } = profile;
  const requieredFields = { firstName, lastName, address, email };
  const emptyFields = Object.values(requieredFields).filter(val => !val);

  if (emptyFields.length && !isSingleUse) {
    return <Route to={paths.accountSetup} render={AccountSetup} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
