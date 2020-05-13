import PropTypes from 'prop-types';

export const TypeItem = PropTypes.shape({
  type: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.string,
});

export const TypeCard = PropTypes.shape({
  cardNumber: PropTypes.string,
  expMonth: PropTypes.number,
  expYear: PropTypes.number,
  cvc: PropTypes.number,
});

export const TypeUser = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gender: PropTypes.string,
  autoRefill: PropTypes.number,
  phone: PropTypes.string,
});
