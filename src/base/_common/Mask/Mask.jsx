import React from 'react';
import MaskedInput from 'react-text-mask';
import * as PropTypes from 'prop-types';

const Mask = ({ inputRef, mask = [], ...rest }) => (
  <MaskedInput
    {...rest}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={mask}
    guide={false}
  />
);

Mask.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  mask: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Mask;
