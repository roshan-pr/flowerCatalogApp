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

const injectUsers = (users) => (req, res, next) => {
  req.users = users;
  next();
};
