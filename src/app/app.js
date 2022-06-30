const { createRouter } = require('../server/router.js');
const { staticFileFrom } = require('./staticFileHandler.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { logRequestHandler } = require('./handlerLib.js');
const { loadGuestbook } = require('./loadGuestbook.js');
const { apiHandler } = require("./apiHandler");
const { searchParamsHandler } = require("./searchParamsHandler");

const app = (staticFilePath, commentPath, templatePath) => {

  const handlers = [
    searchParamsHandler,
    logRequestHandler,
    loadGuestbook(commentPath, templatePath),
    apiHandler,
    createGuestbookHandler,
    staticFileFrom(staticFilePath),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
