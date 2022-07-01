const parseParams = (params) => {
  const parsedParams = {};
  for (const [key, value] of params.entries()) {
    parsedParams[key] = value;
  }
  return parsedParams;
};

module.exports = { parseParams };
