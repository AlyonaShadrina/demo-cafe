import React from 'react';
import PropTypes from 'prop-types';
import palette from '../../../styles/palette';

const SvgSymbol = ({ iconName, path, className, ...rest }) => {
  const { fill } = rest;

  let fillColor = fill;

  switch (fill) {
    case 'primary':
      fillColor = palette.primary.main;
      break;
    case 'secondary':
      fillColor = palette.secondary.main;
      break;
    default:
      fillColor = fill;
  }

  return (
    <svg className={className} {...rest} fill={fillColor}>
      <use xlinkHref={`${path}#icon-${iconName}`} />
    </svg>
  );
};
SvgSymbol.defaultProps = {
  className: '',
  iconName: '',
};
SvgSymbol.propTypes = {
  iconName: PropTypes.string,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SvgSymbol;
