const { createRouter } = require('./server/router.js');
const { logRequestHandler } = require('./app/logRequestHandler.js');
const { searchParamsHandler } = require("./app/searchParamsHandler.js");
const { parseBodyParams } = require('./app/parseBodyParams.js');

const { injectCookies } = require('./app/cookieHandler.js');
const { injectSession, injectUsers } = require('./app/sessionHandler.js');

const { signupHandler } = require("./app/signupHandler.js");
const { loginHandler } = require("./app/loginHandler.js");
const { logoutHandler } = require("./app/logoutHandler.js");

const { loadGuestbook } = require('./app/loadGuestbook.js');
const { guestbookHandler } = require('./app/guestbookHandler.js');
const { apiRouter } = require("./app/apiHandler.js");
const { staticFileFrom } = require('./app/staticFileHandler.js');

const { noFileHandler } = require('./app/noFileHandler.js');

const injectUrlObject = (req, res, next) => {
  req.url = new URL(req.url, 'http://' + req.headers.host);
  next();
};

const createApp = (config, logger, sessions = {}) => {
  const { commentsFilePath, usersFilePath,
    templatePath, staticFilePath } = config;

  const loginPageTemplate = './template/loginTemplate.html';
  const handlers = [
    injectUrlObject,
    parseBodyParams,
    searchParamsHandler,
    logRequestHandler(logger),
    injectCookies,
    injectSession(sessions),
    injectUsers(usersFilePath),

    signupHandler,
    loginHandler(sessions, loginPageTemplate),
    logoutHandler(sessions),
    loadGuestbook(commentsFilePath, templatePath),
    apiRouter,
    guestbookHandler,
    staticFileFrom(staticFilePath),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { createApp };
