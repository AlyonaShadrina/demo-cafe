// eslint-disable-next-line import/prefer-default-export
export const notifications = {
  errors: {
    default: 'Something went wrong.',
    server: {
      400: 'Your request is invalid. Try to clean cookie and login again.',
      401: 'Your API key is wrong. Try to clean cookie and login again.',
      403: 'You have no access to this information.',
      404: 'Page could not be found.',
      405: 'You tried to access a kitten with an invalid method.',
      406: 'You requested a format that is not acceptable (maybe, it`s not a .json?).',
      410: 'This info removed from our servers.',
      418: "I'm a teapot.",
      429: 'Too Many Requests. Try to clean cookie and login again.',
      500: 'We had a problem with our server. Try again later.',
      503: "We're temporarily offline for maintenance. Please try again later.",
    },
  },
};
