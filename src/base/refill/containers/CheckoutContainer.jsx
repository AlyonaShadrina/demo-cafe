import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { paths } from '../../../config';

import ContentLayout from '../../_common/ContentLayout';
import cardFields from '../../profile/components/CardsList/cardFields';
import CardSelection from '../components/Checkout/CardSelection';
import ConfirmPasswordForm from '../components/Checkout/ConfirmPasswordForm';
import OrderInfo from '../components/Checkout/OrderInfo';

import * as actions from '../state/actions';
import * as selectors from '../state/selectors';
import * as actionsLayout from '../../layout/state/actions';
import * as selectorsProfile from '../../profile/state/selectors';

/**
 * Component shows cards info and order info.
 *
 * By default 'isDefault' card will be selected unless user choose another one.
 * If user start typing new card info, all existing radio cards are deselected.
 *
 * When clicking on checkout, we make check password request (if user wants to pay with Saved cards) and then try to pay with card.
 * */

const CheckoutContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { invoiceId } = useParams();

  useEffect(() => {
    dispatch(actions.getInvoiceRequest(invoiceId));
  }, []);

  const { cards, id } = useSelector(selectorsProfile.profile);
  const { invoiceToItems, total } = useSelector(selectors.checkout);

  const fields = cardFields(false, { fullWidth: true });

  const defaultCard = cards?.find(card => card.isDefault);

  const formik = useFormik({
    initialValues: {
      method: 'CARD',
      amount: total,
      cardId: defaultCard?.id,
      cardNumber: '',
      cvc: '',
      expMonth: '',
      expYear: '',
    },
    onSubmit: values => {
      // cr-90
      // Only for Saved cards the psw should be re-checked
      // If user enter new credit card number - the pop-up doesт't appear
      if (values.cardId) {
        const confirmPasswordCallback = () => {
          dispatch(actionsLayout.dialogRemove());
          dispatch(
            actions.postPaymentRequest({
              ...values,
              userId: id,
              invoiceId,
              callback: () => history.push(paths.account),
            }),
          );
        };

        dispatch(
          actionsLayout.dialogSet({
            title: `PLEASE RE-ENTER YOUR PASSWORD BEFORE CONTINUING`,
            content: <ConfirmPasswordForm callback={confirmPasswordCallback} />,
            darkStyle: true,
          }),
        );
      } else {
        dispatch(
          actions.postPaymentRequest({
            ...values,
            userId: id,
            invoiceId,
            callback: () => history.push(paths.account),
          }),
        );
      }
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      cardNumber: Yup.string().matches(/\d{4}\s\d{4}\s\d{4}\s\d{4}/, 'wrong value'),
      cvc: Yup.string().matches(/^\d{3}$|^\d{4}$/, 'wrong value'),
      expMonth: Yup.string(),
      expYear: Yup.string().matches(/^\d{2}$/, 'wrong value'),
    }),
  });

  const { values, setFieldValue, handleSubmit, handleChange, touched, errors, resetForm } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <ContentLayout
        submitButtonText="Checkout"
        submitButtonProps={{
          disabled:
            !total || Object.values(errors).length || (!values.cardId && !values.cardNumber),
        }}
        cancelButtonProps={{
          onClick: resetForm,
        }}
      >
        <div className="gridContainer">
          <div className="gridLeft">
            <CardSelection
              cards={cards}
              values={values}
              setFieldValue={setFieldValue}
              newCardFields={fields}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
          </div>
          <div className="gridRight">
            <OrderInfo invoiceToItems={invoiceToItems} total={total} />
          </div>
        </div>
      </ContentLayout>
    </form>
  );
};

export default CheckoutContainer;
