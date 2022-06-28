const { serveFileContent } = require('./serveFileContent.js');
const { noFileHandler } = require('./noFileHandler.js');
const { setUsers, commentHandler } = require('./commentHandler.js');

const createHandler = (directory) => {
  const handlers = [setUsers(), commentHandler, serveFileContent(directory), noFileHandler];
  return (request, response) => handlers.some((handler) => handler(request, response));
};

module.exports = { createHandler };
