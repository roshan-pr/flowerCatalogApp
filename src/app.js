const { logRequestHandler } = require('./app/logRequestHandler.js');
const { injectCookies } = require('./app/cookieHandler.js');
const { injectSession, injectUsers } = require('./app/sessionHandler.js');
const { logoutHandler } = require("./app/logoutHandler.js");
const { loadGuestbook } = require('./app/loadGuestbook.js');
const { noFileHandler } = require('./app/noFileHandler.js');
const { loginUser, createLoginPage } = require("./app/loginHandler.js");
const { signupUser, serveSignupPage } = require("./app/signupHandler.js");
const guestbookRouter = require('./app/guestbookHandler.js');
const { readFile } = require('./app/readFileContent.js');

const express = require('express');

const createAuthRouter = (sessions, loginPageTemplate, readFile) => {
  const authRouter = express.Router();
  authRouter.get('/login', createLoginPage(loginPageTemplate, readFile));
  authRouter.post('/login', loginUser(sessions));
  authRouter.get('/signup', serveSignupPage);
  authRouter.post('/signup', signupUser);
  authRouter.get('/logout', logoutHandler(sessions));

  return authRouter;
};

const createApp = (config, logger, sessions = {}) => {
  const { commentsFilePath, loginPageTemplate,
    usersFilePath, templatePath, staticFilePath } = config;

  const app = express();
  const middleware = [
    logRequestHandler(logger),
    express.static(staticFilePath),
    express.urlencoded({ extended: true }),
    injectCookies,
    injectSession(sessions),
    injectUsers(usersFilePath)
  ];
  app.use(middleware);
  app.use(createAuthRouter(sessions, loginPageTemplate, readFile));

  app.use(loadGuestbook(commentsFilePath, templatePath));
  app.use('/guest-book', guestbookRouter);
  app.use(noFileHandler);
  return app;
};

module.exports = { createApp };
