import React from 'react';

const Logo = ({ fill = '#fff' }) => (
  <svg width="28" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill={fill} d="M0 0h5.45v26.55H0z" />
    <path fill={fill} d="M26.55 0v5.45H0V0zM17.02 21.1v5.45H0V21.1z" />
    <path fill={fill} d="M27.92 32h-5.45V0h5.45z" />
  </svg>
);

export default Logo;
