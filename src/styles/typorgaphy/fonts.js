import GothamB from '../../assets/fonts/GothamMedium.otf';
import GothamL from '../../assets/fonts/GothamLight.otf';
import build from '../../assets/fonts/built_titling_rg.otf';

export const GothamBook = {
  fontFamily: 'GothamBook',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('GothamBook'),
    url(${GothamB}) format('woff2')
  `,
  // unicodeRange:
  //   'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const GothamLight = {
  fontFamily: 'GothamLight',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('GothamLight'),
    url(${GothamL}) format('woff2')
  `,
  // unicodeRange:
  //   'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const Build = {
  fontFamily: 'build',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('build'),
    url(${build}) format('woff2')
  `,
  // unicodeRange:
  //   'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
