const getLoginPage = () => `
<html>

<head>
  <title>Login page</title>
</head>

<body>
  <div class="page-wrapper">
    <header>
      <h2>Login</h2>
    </header>

    <form action="login" method="POST">
      <div>
        <label for="name">Username</label>
        <input type="text" name="username" id="name" placeholder="Enter name" required>
      </div>

      <div class="login-button">
        <input type="submit" value="Login">
      </div>

    </form>
  </div>
</body>

</html>`;

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

const loginHandler = (sessions) => (req, res, next) => {
  const { method, url: { pathname } } = req;
  if (pathname !== '/login') {
    next();
    return;
  }

  if (method === 'GET') {
    const loginTemplate = getLoginPage();
    res.setHeader('content-type', 'text/html');
    res.end(loginTemplate);
    return;
  }

  if (method === 'POST') {
    const { username } = req.bodyParams;
    const session = createSession(username);
    sessions[session.sessionId] = session;
    console.log(sessions);

    res.setHeader('Set-Cookie', `id=${session.sessionId}`);
    res.statusCode = 302;
    res.setHeader('location', '/guest-book');
    res.end();
    return;
  }

  next();
};

module.exports = { loginHandler, injectCookies, injectSession };
