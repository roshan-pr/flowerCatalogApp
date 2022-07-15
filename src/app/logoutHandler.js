const logoutHandler = (sessions) => (req, res, next) => {
  const { id } = req.cookies;
  res.location('/');
  res.clearCookie(`id=${id}`);
  delete sessions[id];
  res.status(302).end();
  return;
};
exports.logoutHandler = logoutHandler;
