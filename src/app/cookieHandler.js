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

module.exports = { injectCookies };
