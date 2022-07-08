const logoutHandler = (sessions) => (req, res, next) => {
  if (req.url.pathname === '/logout') {
    const { id } = req.cookies;
    res.statusCode = 302;
    res.setHeader('location', '/');
    res.setHeader('set-cookie', `id=${id}; Max-Age=0`);
    delete sessions[id];
    res.end();
    return;
  }
  next();
};
exports.logoutHandler = logoutHandler;
