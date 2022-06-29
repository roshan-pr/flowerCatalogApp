const fs = require('fs');
const { readFiles } = require('./readFileContent.js');
const mime = require('mime-types');

const staticFileFrom = (rootPath = './public') => {
  const fileContents = readFiles(rootPath);

  return ({ url }, response) => {
    url.pathname = url.pathname === '/' ? '/homePage.html' : url.pathname;

    const fileName = rootPath + url.pathname;
    const content = fileContents[fileName];
    if (!content) {
      return false;
    };

    response.setHeader('content-type', mime.lookup(fileName));
    response.end(content);
    return true;
  };
}

module.exports = { staticFileFrom };
