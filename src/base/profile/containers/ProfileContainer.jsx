import { Box, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContentLayout from '../../_common/ContentLayout';
import ProfileFields from '../components/ProfileFields';
import TimePrintsInfo from '../components/TimePrintsInfo';
import * as actions from '../state/actions';
import * as selectors from '../state/selectors';
import { profile } from '../../../validation/profile';
import * as actionsLayout from '../../layout/state/actions';
import DialogContentSuccessUpdate from '../components/DialogContentSuccessUpdate';

// So, weired things happened with formik-material-ui (see commit 219a29f0).
// When form inputs were <TextField ... /> - it was ok on ubuntu local dev mode, but failed on windows local dev mode and on server build.
// When from inputs become <Field component={TextField} ... /> - it was ok on windows local dev mode and on server build, but failed on ubuntu local dev mode.

const useStyles = makeStyles(theme => ({
  editButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&[disabled]': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
}));

const ProfileContainer = () => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => setEditMode(!editMode);

  const { firstName, lastName, phone, address, email, cards, autoRefill, refill, id } = useSelector(
    selectors.profile,
  );

  const initial = {
    firstName,
    lastName,
    phone,
    address,
    email,
    cards,
    password: '',
    autoRefill,
    refillId: refill?.id,
  };

  const dispatch = useDispatch();

  const submit = (values, { setSubmitting }) => {
    const valuesToSend = { ...values };
    if (!valuesToSend.password) {
      delete valuesToSend.password;
    }
    const callback = () => {
      setSubmitting(false);
      dispatch(
        actionsLayout.dialogSet({
          content: <DialogContentSuccessUpdate />,
          darkStyle: true,
          timeout: 2500,
        }),
      );
    };
    dispatch(actions.updateProfileRequest({ id, data: valuesToSend, callback }));
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: submit,
    validationSchema: profile,
    enableReinitialize: true,
  });

  const { errors, dirty, values, handleChange, handleReset } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <ContentLayout
        title="My account"
        cancelButtonProps={{
          onClick: handleReset,
          disabled: !dirty,
        }}
        submitButtonProps={{
          disabled: !dirty || !!Object.keys(errors).length,
        }}
      >
        <div className="gridContainer">
          <div className="gridLeft">
            <Paper component={Grid} container>
              <Box pt={1} pl={3} pb={3} component={Grid} item xs={9}>
                <ProfileFields
                  initialValues={initial}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  disableAll={!editMode}
                />
              </Box>
              <Box p={1} xs={3} component={Grid} textAlign="right">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className="noTextTransform"
                  classes={{
                    contained: classes.editButton,
                  }}
                  onClick={handleEditMode}
                >
                  Edit profile
                </Button>
              </Box>
            </Paper>
          </div>
          <div className="gridTitle">
            <Typography variant="h1">My Account</Typography>
          </div>
          <div className="gridRight">
            <TimePrintsInfo />
          </div>
        </div>
      </ContentLayout>
    </form>
  );
};

export default ProfileContainer;
