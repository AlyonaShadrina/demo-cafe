import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../state/actions';
import LoginForm from '../components/LoginForm';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = values => dispatch(actions.LoginRequest({ values, history }));

  return <LoginForm handleSubmit={login} />;
};
export default LoginContainer;
