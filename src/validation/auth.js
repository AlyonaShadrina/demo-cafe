import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const login = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\(\d{3}\)\s{1}\d{3}-\d{4}$/, {
      message: 'not valid',
      excludeEmptyString: true,
    })
    .required('required'),
  // password: Yup.string().required('required'),
});
