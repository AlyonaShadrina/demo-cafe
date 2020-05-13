import palette from '../palette';

const typography = {
  fontFamily: ['GothamLight', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  fontSize: 16,
  fontWeight: 'normal',
  h1: {
    fontFamily: 'GothamBook',
    // fontWeight: 600,
    fontSize: 30,
    color: palette.secondary.main,
    // marginTop: 0,
    // marginBottom: 10,
  },
  // h2: {
  //     fontWeight: 'normal',
  //     fontSize: 20,
  // },
  body1: {
    fontSize: 14,
  },
  body2: {
    fontSize: 12,
  },
  // subtitle1: {
  //     fontSize: 12,
  // },
  // subtitle2: {
  //     fontSize: 10,
  // },
  // overline: {
  //     fontSize: 10,
  //     color: colors.grey,
  // },
  // caption: {
  //     fontSize: 16,
  //     fontWeight: 500,
  // },
};

export default typography;
