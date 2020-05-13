import * as Yup from 'yup';

export const profile = Yup.object().shape({
  phone: Yup.string()
    .matches(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/g, {
      message: 'Phone number is not valid',
      excludeEmptyString: true,
    })
    .required('Please enter your phone number'),
  address: Yup.string().required('Please enter your address'),
  firstName: Yup.string()
    .min(2, 'Please enter not less than 2 characters')
    .max(100, 'Please enter no more than 100 characters')
    .required('Please enter your name'),
  lastName: Yup.string()
    .min(2, 'Please enter not less than 2 characters')
    .max(100, 'Please enter no more than 40 characters')
    .required('Please enter your last name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  refillId: Yup.number().when('autoRefill', {
    is: true,
    then: Yup.number()
      .test('refillId', 'Select plan', value => !!value)
      // .test('refillId', 'Select plan', value => value !== 0)
      .required(''),
    otherwise: Yup.number().notRequired(),
  }),
});

export const profileSetup = Yup.object().shape({
  address: Yup.string('Please enter your address')
    .required('Please enter your address')
    .min(5, 'Please enter not less than 5 characters'),
  firstName: Yup.string('Please enter your name')
    .min(2, 'Please enter not less than 2 characters')
    .max(100, 'Please enter no more than 100 characters')
    .required('Please enter your name'),
  lastName: Yup.string('Please enter your last name')
    .min(2, 'Please enter not less than 2 characters')
    .max(100, 'Please enter no more than 100 characters')
    .required('Please enter your last name'),
  email: Yup.string('Please enter an email')
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: Yup.string('Please enter password')
    .required('Please enter password')
    .min(4, 'Please enter not less than 4 characters')
    .max(40, 'Please enter no more than 40 characters'),
  confirmPassword: Yup.string('Please enter password')
    .required('Please repeat password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});
