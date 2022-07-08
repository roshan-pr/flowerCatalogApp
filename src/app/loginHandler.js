const { readFile } = require('./readFileContent');

const parseCookies = (cookieString) => {
  const cookies = {};
  if (!cookieString) {
    return cookies;
  }
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  });
  return cookies;
};

const injectCookies = (req, res, next) => {
  const { cookie } = req.headers
  req.cookies = parseCookies(cookie);
  next();
};

const injectSession = (sessions) => (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    next();
    return;
  }
  const { id } = req.cookies;
  req.session = sessions[id];
  next();
};

const createSession = (username) => {
  const date = new Date();
  return { sessionId: date.getTime(), username }
};

const isUserValid = ({ users, bodyParams: { username, password } }) => {
  if (!users[username]) {
    return false;
  }
  return users[username].password === password;
};

const showLoginPage = (res, loginFileName) => {
  const loginTemplate = readFile(loginFileName);
  res.setHeader('content-type', 'text/html');
  res.end(loginTemplate);
};

const redirectToGuestbook = (res) => {
  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.end();
};

const loginHandler = (sessions, loginFileName) => (req, res, next) => {
  const { method, url: { pathname } } = req;

  if (pathname === '/login' && method === 'GET') {
    showLoginPage(res, loginFileName);
    return;
  }

  if (pathname === '/login' && method === 'POST' && isUserValid(req)) {
    const { username } = req.bodyParams;
    const session = createSession(username);
    sessions[session.sessionId] = session;
    res.setHeader('Set-Cookie', `id=${session.sessionId}`);

    redirectToGuestbook(res);
    return;
  }

  next();
};

module.exports = { loginHandler, injectCookies, injectSession };

