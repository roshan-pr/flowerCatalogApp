const { createRouter } = require('../server/router.js');
const { staticFileFrom } = require('./staticFileHandler.js');
const { noFileHandler } = require('./noFileHandler.js');
const { guestbookHandler } = require('./guestbookHandler.js');
const { logRequestHandler } = require('./logRequestHandler.js');
const { loadGuestbook } = require('./loadGuestbook.js');
const { apiRouter } = require("./apiHandler.js");
const { searchParamsHandler } = require("./searchParamsHandler.js");
const { parseBodyParams } = require('./parseBodyParams.js');

const app = ({ commentPath, templatePath, staticFilePath }) => {

  const guestbookLoader = loadGuestbook(commentPath, templatePath);
  const staticFileHandler = staticFileFrom(staticFilePath);

  const handlers = [logRequestHandler, parseBodyParams, searchParamsHandler,
    guestbookLoader, apiRouter, guestbookHandler, staticFileHandler,
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
