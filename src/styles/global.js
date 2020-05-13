import { GothamLight, GothamBook, Build } from './typorgaphy/fonts';
import bg from '../assets/images/background.png';

// we had to do many !important because this global styles not always override theme style on build

const globalStyle = {
  '@font-face': [GothamBook, GothamLight, Build],
  body: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    position: 'relative',
    minHeight: '100vh',
  },
  a: {
    textDecoration: 'none',
  },
  '*': {
    scrollBehavior: 'smooth',
  },
  '.loadingErrorContainer': {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  '.gridContainer': {
    display: 'grid',
    gridTemplate: `"gridLeft b"
        "gridLeft gridRight"
        "gridLeft gridRight"`,
    gridTemplateColumns: '1.5fr 1fr',
    gridGap: 24,
  },
  '.gridLeft': {
    gridArea: 'gridLeft',
  },
  '.gridRight': {
    gridArea: 'gridRight',
  },
  '.gridBottomButtons': {
    gridArea: 'gridBottomButtons',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  '.gridTitle': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  '.accentFont': {
    fontFamily: 'build !important',
  },
  '.minWidth130': {
    minWidth: '130px !important',
  },
  '.noTextTransform': {
    textTransform: 'unset !important',
  },
  '.fontFamilyBook': {
    fontFamily: 'GothamBook !important',
  },
  '.fontFamilyLight': {
    fontFamily: 'GothamLight !important',
  },
  '.fontWeightBold': {
    fontWeight: 'bold !important',
  },
  '.fontWeightNormal': {
    fontWeight: 'normal !important',
  },
  '.inputHelperTextAbsolute': {
    fontSize: '12px !important',
    position: 'absolute !important',
    top: '47px !important',
    lineHeight: '1 !important',
  },
  '.inputLabelTextSmall': {
    whiteSpace: 'nowrap !important',
    fontSize: '12px !important',
    paddingTop: '4px !important',
  },
  // for notifications
  '.MuiSnackbarContent-root': {
    maxWidth: 350,
  },
  '[class*="SnackbarItem-base"]': {
    flexWrap: 'unset !important',
  },
};

export default globalStyle;
