const { readFile } = require('./readFileContent.js');

const persistUserDetails = (request) => {
  const { username, password } = request.bodyParams;
  request.users[username] = { username, password };
  request.persistUsers(JSON.stringify(request.users));
  return true;
};

const loadSignupPage = (response) => {
  const signupTemplate = readFile('template/signupTemplate.html');
  response.setHeader('content-type', 'text/html');
  response.end(signupTemplate);
  return true;
};

const signupHandler = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname !== '/signup') {
    next();
    return;
  }
  if (req.method === 'GET') {
    loadSignupPage(res);
    return;
  }

  if (req.method === 'POST') {
    persistUserDetails(req);

    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
    return;
  }
  next();
};

module.exports = { signupHandler };
