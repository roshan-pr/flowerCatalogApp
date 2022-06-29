const { serveFileContent } = require('./serveFileContent.js');
const { noFileHandler } = require('./noFileHandler.js');
const { guestbookHandler } = require('./guestbookHandler.js');
const { setGuestbook, commentHandler } = require('./commentHandler.js');

const createHandler = (directory) => {
  const handlers = [setGuestbook(), commentHandler, guestbookHandler,
  serveFileContent(directory), noFileHandler];
  return (request, response) =>
    handlers.some((handler) => handler(request, response));
};

module.exports = { createHandler };
