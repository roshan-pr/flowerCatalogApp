const { createRouter } = require('./server/router.js');
const { staticFileFrom } = require('./app/staticFileHandler.js');
const { noFileHandler } = require('./app/noFileHandler.js');
const { guestbookHandler } = require('./app/guestbookHandler.js');
const { logRequestHandler } = require('./app/logRequestHandler.js');
const { loadGuestbook } = require('./app/loadGuestbook.js');
const { apiRouter } = require("./app/apiHandler.js");
const { searchParamsHandler } = require("./app/searchParamsHandler.js");
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { logoutHandler } = require("./app/logoutHandler.js");
const { readFile } = require('./app/readFileContent.js');
const { loginHandler,
  injectCookies, injectSession } = require("./app/loginHandler.js");

const injectUsers = (users) => (req, res, next) => {
  req.users = users;
  next();
};

const isUserExists = (req) => {
  const { users, bodyParams: { username } } = req;
  return users[username]
};

const signupHandler = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname !== '/signup') {
    next();
    return;
  }
  if (req.method === 'GET') {
    const signupTemplate = readFile('template/signupTemplate.html');
    res.setHeader('content-type', 'text/html');
    res.end(signupTemplate);
    return;
  }

  if (req.method === 'POST') {
    const { username, password } = req.bodyParams;
    req.users[username] = { username, password };

    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
    return;
  }
  next();
};

const app = ({ commentsFilePath, templatePath, staticFilePath }) => {
  const users = { 'vivek': { username: 'vivek', password: 'hello' } };
  const sessions = {};
  const guestbookLoader = loadGuestbook(commentsFilePath, templatePath);
  const staticFileHandler = staticFileFrom(staticFilePath);

  const loginPageTemplate = './template/loginTemplate.html';
  const handlers = [
    logRequestHandler,
    parseBodyParams,
    searchParamsHandler,
    injectCookies,
    injectSession(sessions),
    injectUsers(users),
    signupHandler,
    loginHandler(sessions, loginPageTemplate),
    logoutHandler(sessions),
    guestbookLoader,
    apiRouter,
    guestbookHandler,
    staticFileHandler,
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
