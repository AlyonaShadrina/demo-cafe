import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';

import { getProfileRequest } from '../../base/profile/state/actions';
import { profile, token } from '../../base/profile/state/selectors';
import ProfileContext from './ProfileContext';

const ProfileProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const tokenInfo = useSelector(token);

  const profileInfo = useSelector(profile);
  useEffect(() => {
    if (tokenInfo) {
      dispatch(getProfileRequest());
    }
  }, [tokenInfo, dispatch]);

  useEffect(() => {
    setLoggedIn(!!profileInfo.id && !!tokenInfo);
  }, [profileInfo, tokenInfo]);

  return (
    <ProfileContext.Provider value={{ profile: profileInfo, isLoggedIn }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileProvider;
