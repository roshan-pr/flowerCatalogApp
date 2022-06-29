const { serveFileContent } = require('./serveFileContent.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { Guestbook } = require("./guestbook.js");

const createHandler = (directory) => {
  const guestbook = new Guestbook();
  const handlers = [
    createGuestbookHandler(guestbook),
    serveFileContent(directory),
    noFileHandler];
  return (request, response) =>
    handlers.some((handler) => handler(request, response));
};

module.exports = { createHandler };
