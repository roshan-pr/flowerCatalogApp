const { createRouter } = require('../server/router.js');

const { staticFileFrom } = require('./serveFileContent.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { Guestbook } = require("./guestbook.js");

const createHandler = (directory) => {
  const guestbook = new Guestbook();
  const handlers = [
    createGuestbookHandler(guestbook),
    staticFileFrom(directory),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { createHandler };
