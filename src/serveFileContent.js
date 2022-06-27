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
    pdf: 'application/pdf'
  };
  return contentTypes[extension] || 'text/plain';
};

const serveFileContent = (directory = './html') => {
  const fileContents = readFiles(directory);
  return ({ uri }, response) => {

    const fileName = directory + uri;
    const content = fileContents[fileName];
    if (!content) {
      return false;
    };

    const extension = getExtension(fileName);
    const contentType = determineContentType(extension);
    response.setHeader('content-type', contentType);

    response.send(content);
    return true;
  };
}

module.exports = { serveFileContent };
