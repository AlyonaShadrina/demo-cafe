import * as Yup from 'yup';

export const cardEdit = Yup.object().shape({
  expMonth: Yup.string(),
  // .required('required')
  expYear: Yup.string()
    // .required('required')
    .matches(/^\d{2}$/, 'wrong value'),
});

export const cardCreate = Yup.object().shape({
  cardNumber: Yup.string()
    .required('required')
    .matches(/\d{4}\s\d{4}\s\d{4}\s\d{4}/, 'wrong value'),
  cvc: Yup.string()
    .required('required')
    .matches(/^\d{3}$|^\d{4}$/, 'wrong value'),
  expMonth: Yup.string().required('required'),
  expYear: Yup.string()
    .required('required')
    .matches(/^\d{2}$/, 'wrong value'),
});
