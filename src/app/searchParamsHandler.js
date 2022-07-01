const { parseParams } = require("./lib");

const searchParamsHandler = (req, res, next) => {
  const method = req.method.toLowerCase();
  if (method !== 'get') {
    return next();
  }

  const { searchParams } = req.url;
  const params = {};
  for (const [query, value] of searchParams.entries()) {
    params[query] = value;
  }
  req.url.queryParams = params;
  next();
};

module.exports = { searchParamsHandler };
