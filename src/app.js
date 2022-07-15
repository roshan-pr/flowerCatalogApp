const { createRouter } = require('./server/router.js');
const { logRequestHandler } = require('./app/logRequestHandler.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');

const { injectCookies } = require('./app/cookieHandler.js');
const { injectSession, injectUsers } = require('./app/sessionHandler.js');

const { signupHandler } = require("./app/signupHandler.js");
const { loginUser, createLoginPage } = require("./app/loginHandler.js");
const { logoutHandler } = require("./app/logoutHandler.js");

const { loadGuestbook } = require('./app/loadGuestbook.js');
const { serveGuestbookPage, addComment } = require('./app/guestbookHandler.js');
const { apiHandler, apiQueryHandler } = require("./app/apiHandler.js");

const { noFileHandler } = require('./app/noFileHandler.js');
const express = require('express');

const oldCreateApp = (config, logger, sessions = {}) => {
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
    serveGuestbookPage,
    staticFileFrom(staticFilePath),
    noFileHandler];

  return createRouter(handlers);
};

const guestbookRouter = express.Router();
guestbookRouter.get('/', serveGuestbookPage);
guestbookRouter.post('/add-comment', addComment);

const createApp = (config, logger, sessions = {}) => {
  const { commentsFilePath, loginPageTemplate, usersFilePath, templatePath, staticFilePath } = config;

  const app = express();
  app.use(logRequestHandler(logger));
  app.use(express.static(staticFilePath));
  app.use(parseBodyParams);
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(injectUsers(usersFilePath));

  app.get('/login', createLoginPage(sessions, loginPageTemplate));
  app.post('/login', loginUser(sessions, loginPageTemplate));

  app.get('/signup', signupHandler);
  app.post('/signup', signupHandler);
  app.get('/logout', logoutHandler(sessions));

  app.use(loadGuestbook(commentsFilePath, templatePath));
  app.use('/guest-book', guestbookRouter);
  app.get('/api/comments', apiHandler);

  app.use(noFileHandler);
  return app;
};

module.exports = { createApp };
