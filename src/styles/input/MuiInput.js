import palette from '../palette';

const MuiInput = {
  root: {
    fontFamily: 'GothamLight',
    fontSize: 16,
    fontWeight: 'bold',
    color: palette.secondary.main,
  },
  underline: {
    '&:before': {
      borderBottomColor: palette.primary.main,
    },
  },
};

export default MuiInput;
