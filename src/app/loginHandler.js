const { readFile } = require('./readFileContent');

const createSession = (username) => {
  const date = new Date();
  return { sessionId: date.getTime(), username }
};

const isValidUser = ({ users, bodyParams: { username, password } }) => {
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

const redirectToSignup = (res) => {
  res.statusCode = 302;
  res.setHeader('location', '/signup');
  res.end();
};

const loginHandler = (sessions, loginFileName) => (req, res, next) => {
  const { method, url: { pathname } } = req;

  if (pathname === '/login' && method === 'GET') {
    showLoginPage(res, loginFileName);
    return;
  }

  if (pathname === '/login' && method === 'POST') {
    if (!isValidUser(req)) {
      redirectToSignup(res);
      return;
    }
    const { username } = req.bodyParams;
    const session = createSession(username);
    sessions[session.sessionId] = session;
    res.setHeader('Set-Cookie', `id=${session.sessionId}`);

    redirectToGuestbook(res);
    return;
  }

  next();
};

module.exports = { loginHandler };

