export const objToQueryString = obj => {
  const str = Object.keys(obj).map(key => {
    const value = typeof obj[key] === 'string' ? obj[key].replace('+', '%2B') : obj[key];
    return `${key}=${value}`;
  });

  return str.join('&');
};

export const queryStringToObj = string => {
  let query = '';
  let queryObj = {};

  if (string) {
    query = string.substring(1);
    queryObj = JSON.parse(
      `{"${decodeURI(query)
        .replace(/%2B/g, '+')
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`,
    );
  }

  return queryObj;
};
