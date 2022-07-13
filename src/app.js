const { createRouter } = require('./server/router.js');
const { logRequestHandler } = require('./app/logRequestHandler.js');
const { searchParamsHandler } = require("./app/searchParamsHandler.js");
const { parseBodyParams } = require('./app/parseBodyParams.js');

const { injectCookies } = require('./app/cookieHandler.js');
const { injectSession, injectUsers } = require('./app/sessionHandler.js');

const { signupHandler } = require("./signupHandler.js");
const { loginHandler } = require("./app/loginHandler.js");
const { logoutHandler } = require("./app/logoutHandler.js");

const { loadGuestbook } = require('./app/loadGuestbook.js');
const { guestbookHandler } = require('./app/guestbookHandler.js');
const { apiRouter } = require("./app/apiHandler.js");
const { staticFileFrom } = require('./app/staticFileHandler.js');

const { noFileHandler } = require('./app/noFileHandler.js');

const app = ({ commentsFilePath, templatePath, staticFilePath }) => {
  const sessions = {};

  const loginPageTemplate = './template/loginTemplate.html';
  const handlers = [
    parseBodyParams,
    searchParamsHandler,
    logRequestHandler,
    injectCookies,
    injectSession(sessions),
    injectUsers(),

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

module.exports = { app };
