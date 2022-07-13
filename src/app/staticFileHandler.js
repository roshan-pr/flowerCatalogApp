const fs = require('fs');
const mime = require('mime-types');

const staticFileFrom = (rootPath = './public') => {

  return ({ url }, res, next) => {
    url.pathname = url.pathname === '/' ? '/index.html' : url.pathname;

    const fileName = rootPath + url.pathname;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        next();
        return;
      };
      const contentType = mime.lookup(fileName) || 'text/plain'
      res.setHeader('content-type', contentType);
      res.end(data);
    });
  };
}

module.exports = { staticFileFrom };
