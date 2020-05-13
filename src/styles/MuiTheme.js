import { createMuiTheme } from '@material-ui/core';

import globalStyle from './global';
import MuiInput from './input/MuiInput';
import palette from './palette';
import typography from './typorgaphy';
import MuiFormControl from './input/MuiFormControl';

const MuiTheme = createMuiTheme({
  palette,

  typography,

  overrides: {
    MuiCssBaseline: {
      '@global': globalStyle,
    },
    MuiInput,
    MuiFormControl,
    MuiInputLabel: {
      root: {
        fontFamily: 'GothamLight',
        fontSize: 16,
      },
    },
    MuiButton: {
      root: {
        fontFamily: 'GothamBook',
      },
      contained: {
        boxShadow: 'none',
        // fontWeight: 600,
        '&:hover': {
          boxShadow: 'none',
        },
      },
      containedSecondary: {
        color: '#fff',
      },
      sizeSmall: {
        fontSize: 12,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 0,
      },
    },
  },
});

export default MuiTheme;
