import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AccountSetupForm from '../components/AccountSetupForm';
import * as actions from '../state/actions';
import * as selectors from '../state/selectors';
import * as actionsLayout from '../../layout/state/actions';
import DialogContentSuccessUpdate from '../components/DialogContentSuccessUpdate';

const ProfileContainer = () => {
  const { firstName, lastName, address, email, id } = useSelector(selectors.profile);
  const history = useHistory();

  const initial = {
    firstName,
    lastName,
    address,
    email,
    password: '',
    confirmPassword: '',
  };

  const dispatch = useDispatch();

  const submit = (values, { setSubmitting }) => {
    const valuesToSend = { ...values };

    const callback = () => {
      history.push('/');
      dispatch(
        actionsLayout.dialogSet({
          content: <DialogContentSuccessUpdate />,
          darkStyle: true,
          timeout: 2500,
        }),
      );
    };
    dispatch(actions.updateProfileRequest({ id, data: valuesToSend, callback }));
    setSubmitting(false);
  };

  return <AccountSetupForm initial={initial} submit={submit} />;
};

export default ProfileContainer;
