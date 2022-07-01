const { parseParams } = require('./lib.js');

const parseBodyParams = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (method !== 'POST') {
    next();
    return;
  }

  req.setEncoding('utf8');
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    req.bodyParams = parseParams(new URLSearchParams(data));
    next();
  });
};

module.exports = { parseBodyParams };
