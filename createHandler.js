const { serveFileContent } = require('./src/serveFileContent.js');
const { noFileHandler } = require('./src/noFileHandler.js');
const { setUsers, commentHandler } = require('./src/commentHandler.js');

const createHandler = (directory) => {
  const handlers = [setUsers(), commentHandler, serveFileContent(directory), noFileHandler];
  return (request, response) => handlers.some((handler) => handler(request, response));
};

module.exports = { createHandler };
