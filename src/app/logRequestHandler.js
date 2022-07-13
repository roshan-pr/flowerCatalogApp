const logRequestHandler = (logger) => (req, res, next) => {
  logger(req);
  next();
};

module.exports = { logRequestHandler };
