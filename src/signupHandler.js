const { readFile } = require('./app/readFileContent.js');

const signupHandler = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname !== '/signup') {
    next();
    return;
  }
  if (req.method === 'GET') {
    const signupTemplate = readFile('template/signupTemplate.html');
    res.setHeader('content-type', 'text/html');
    res.end(signupTemplate);
    return;
  }

  if (req.method === 'POST') {
    const { username, password } = req.bodyParams;
    req.users[username] = { username, password };

    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
    return;
  }
  next();
};
exports.signupHandler = signupHandler;
