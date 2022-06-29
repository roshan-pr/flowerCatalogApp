const fs = require('fs');
const { readFiles } = require('./readFileContent.js');

const getExtension = (fileName) => {
  const index = fileName.lastIndexOf('.');
  return fileName.substring(index + 1);
};

const determineContentType = (extension) => {
  const contentTypes = {
    jpeg: 'image/jpeg',
    html: 'text/html',
    pdf: 'application/pdf',
    gif: 'image/gif',
    css: 'text/html'
  };
  return contentTypes[extension] || 'text/plain';
};

const staticFileFrom = (rootPath = './public') => {
  const fileContents = readFiles(rootPath);

  return ({ url }, response) => {
    url.pathname = url.pathname === '/' ? '/homePage.html' : url.pathname;

    const fileName = rootPath + url.pathname;
    const content = fileContents[fileName];
    if (!content) {
      return false;
    };

    const extension = getExtension(fileName);
    const contentType = determineContentType(extension);
    response.setHeader('content-type', contentType);
    response.end(content);
    return true;
  };
}

module.exports = { staticFileFrom };
