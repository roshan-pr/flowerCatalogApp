const { createRouter } = require('../server/router.js');
const { staticFileFrom } = require('./staticFileHandler.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { logRequestHandler } = require('./handlerLib.js');
const { loadGuestbook } = require('./loadGuestbook.js');
const { apiRouter } = require("./apiHandler.js");
const { searchParamsHandler } = require("./searchParamsHandler.js");

const app = (staticFilePath, commentPath, templatePath) => {

  const handlers = [
    searchParamsHandler,
    logRequestHandler,
    loadGuestbook(commentPath, templatePath),
    apiRouter,
    createGuestbookHandler,
    staticFileFrom(staticFilePath),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
