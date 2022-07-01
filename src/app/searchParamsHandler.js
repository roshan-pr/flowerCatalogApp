const { parseParams } = require("./lib");

const searchParamsHandler = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (method === 'GET') {
    req.searchParams = parseParams(req.url.searchParams);
  }

  next();
};

module.exports = { searchParamsHandler };
