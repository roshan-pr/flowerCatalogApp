const fs = require('fs');
const { readFiles } = require('./readFileContent.js');
const mime = require('mime-types');

const staticFileFrom = (rootPath = './public') => {
  const fileContents = readFiles(rootPath);

  return ({ url }, res, next) => {
    url.pathname = url.pathname === '/' ? '/homePage.html' : url.pathname;

    const fileName = rootPath + url.pathname;
    const content = fileContents[fileName];
    if (!content) {
      return next();
    };

    const contentType = mime.lookup(fileName) || 'text/plain'
    res.setHeader('content-type', contentType);
    res.end(content);
  };
}

module.exports = { staticFileFrom };
