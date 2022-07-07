const { createRouter } = require('./server/router.js');
const { staticFileFrom } = require('./app/staticFileHandler.js');
const { noFileHandler } = require('./app/noFileHandler.js');
const { guestbookHandler } = require('./app/guestbookHandler.js');
const { logRequestHandler } = require('./app/logRequestHandler.js');
const { loadGuestbook } = require('./app/loadGuestbook.js');
const { apiRouter } = require("./app/apiHandler.js");
const { searchParamsHandler } = require("./app/searchParamsHandler.js");
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { loginHandler, injectCookies, injectSession } = require("./app/loginHandler.js");

const sessions = {};

const logoutHandler = (req, res, next) => {
  if (req.url.pathname === '/logout') {
    const { id } = req.cookies;
    res.statusCode = 302;
    res.setHeader('location', '/');
    res.setHeader('set-cookie', `id=${id}; Max-Age=0`);
    res.end();
    delete sessions[id];
    return;
  }
  next();
};


const app = ({ commentPath, templatePath, staticFilePath }) => {

  const guestbookLoader = loadGuestbook(commentPath, templatePath);
  const staticFileHandler = staticFileFrom(staticFilePath);

  const handlers = [
    logRequestHandler,
    parseBodyParams,
    searchParamsHandler,
    injectCookies,
    injectSession(sessions),
    loginHandler(sessions),
    logoutHandler,
    guestbookLoader,
    apiRouter,
    guestbookHandler,
    staticFileHandler,
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
