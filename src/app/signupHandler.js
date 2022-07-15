const { readFile } = require('./readFileContent.js');

const persistUserDetails = (request) => {
  const { username, password } = request.bodyParams;
  request.users[username] = { username, password };
  request.persistUsers(JSON.stringify(request.users));
  return true;
};

const serveSignupPage = (response) => {
  const signupPage = readFile('template/signupTemplate.html');
  response.setHeader('content-type', 'text/html');
  response.end(signupPage);
  return true;
};

const usernameExists = (req) => {
  const { users, bodyParams: { username } } = req;
  return users[username];
};

const serveErrorCode = (res) => {
  res.statusCode = 409
  res.end('username exists');
  return true;
};

const signupHandler = (req, res, next) => {
  const pathname = req.url;
  if (pathname !== '/signup') {
    next();
    return;
  }
  if (req.method === 'GET') {
    serveSignupPage(res);
    return;
  }

  if (req.method === 'POST') {
    if (usernameExists(req)) {
      serveErrorCode(res);
      return;
    }
    persistUserDetails(req);

    res.statusCode = 200;
    res.end('successful');
    return;
  }
  next();
};

module.exports = { signupHandler };
