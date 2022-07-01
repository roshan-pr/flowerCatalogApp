const { createRouter } = require('../server/router.js');
const { staticFileFrom } = require('./staticFileHandler.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { logRequest } = require('./lib.js');
const { loadGuestbook } = require('./loadGuestbook.js');
const { apiRouter } = require("./apiHandler.js");
const { searchParamsHandler } = require("./searchParamsHandler.js");
const { parseBodyParamsHandler } = require('./parseBodyParams.js');

const app = ({ commentPath, templatePath, staticFilePath }) => {

  const handlers = [
    parseBodyParamsHandler,
    searchParamsHandler,
    logRequest,
    loadGuestbook(commentPath, templatePath),
    apiRouter,
    createGuestbookHandler,
    staticFileFrom(staticFilePath),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
