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

const injectUsers = (users) => (req, res, next) => {
  req.users = users;
  next();
};

module.exports = { injectSession, injectUsers };
