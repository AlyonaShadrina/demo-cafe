import { Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Loading from '../../_common/Loading';
import ContentLayout from '../../_common/ContentLayout';
import CategoryLayout from '../components/Refill/CategoryLayout';
import RefillItemsList from '../components/Refill/RefillItemsList';

import * as actionsLayout from '../../layout/state/actions';
import * as selectorsProfile from '../../profile/state/selectors';
import * as actions from '../state/actions';
import * as selectors from '../state/selectors';

const RefillContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.getItemsRequest());
  }, []);

  const { id } = useSelector(selectorsProfile.profile);
  const { TIME, PACKAGES } = useSelector(selectors.items);
  const isLoading = useSelector(selectors.isLoading);

  const initial = {};

  const initialArray = [...TIME, ...PACKAGES];
  if (initialArray) {
    // eslint-disable-next-line array-callback-return
    initialArray.map(item => {
      initial[item.id] = false;
    });
  }

  const formik = useFormik({
    initialValues: {
      print: null,
      time: null,
    },
    onSubmit: values => {
      const itemsToSend = [];

      // eslint-disable-next-line array-callback-return
      Object.keys(values).map(key => {
        if (values[key]) {
          itemsToSend.push({
            id: parseInt(values[key], 10),
            amount: 1,
          });
        }
      });

      if (!itemsToSend.length) {
        dispatch(
          actionsLayout.enqueueSnackbar({
            message: 'Select items',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          }),
        );
      } else {
        dispatch(
          actions.postInvoiceRequest({
            data: {
              userId: id,
              items: itemsToSend,
            },
            // eslint-disable-next-line no-shadow
            callback: id => {
              history.push(`/checkout/${id}`);
            },
          }),
        );
      }
    },
    enableReinitialize: true,
  });

  const { values, setFieldValue, resetForm } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <ContentLayout
        submitButtonText="Checkout"
        cancelButtonProps={{
          onClick: resetForm,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CategoryLayout title="TIME PACKAGE">
              {isLoading ? (
                <Loading />
              ) : (
                <RefillItemsList
                  items={TIME}
                  values={values}
                  setFieldValue={setFieldValue}
                  name="time"
                />
              )}
            </CategoryLayout>
          </Grid>
          <Grid item xs={12}>
            <CategoryLayout title="PRINT PACKAGE">
              {isLoading ? (
                <Loading />
              ) : (
                <RefillItemsList
                  items={PACKAGES}
                  values={values}
                  setFieldValue={setFieldValue}
                  lightStyle
                  name="print"
                />
              )}
            </CategoryLayout>
          </Grid>
        </Grid>
      </ContentLayout>
    </form>
  );
};

export default RefillContainer;
