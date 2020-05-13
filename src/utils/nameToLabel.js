const nameToLabel = string => {
  const spacedString = string.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  return `${spacedString[0].toUpperCase()}${spacedString.slice(1)}`;
};

export default nameToLabel;
