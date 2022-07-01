const logRequest = (req, res, next) => {
  console.log(req.method, req.url.pathname);
  console.log('query :', req.url.queryParams);
  console.log('body :', req.url.bodyParams);
  next();
}

const parseParams = (params) => {
  const urlParams = new URLSearchParams(params);
  const parsedParams = {};
  for (const [key, value] of urlParams.entries()) {
    parsedParams[key] = value;
  }
  return parsedParams;
};

module.exports = { logRequest, parseParams };