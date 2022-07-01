const { parseParams } = require('./lib.js');

const bodyParamsHandler = (req, res, next) => {
  req.setEncoding('utf8');
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    req.url.bodyParams = parseParams(data);
    next();
  });
};

const parseBodyParamsHandler = (req, res, next) => {
  const method = req.method.toLowerCase();
  if (method === 'post') {
    bodyParamsHandler(req, res, next);
  }
  else {
    next();
  }
};

module.exports = { parseBodyParamsHandler };
