const apiHandler = ({ guestbook }, res) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestbook.comments));
  return true;
};

const serveNameHandler = ({ url, guestbook }, res) => {
  const { name } = url.queryParams;
  const comments = guestbook.searchComments(name);

  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(comments));
  return true;
};

const apiRouter = (req, res, next) => {
  const { pathname, queryParams } = req.url;

  if (pathname === '/api' && queryParams.name) {
    return serveNameHandler(req, res);
  }

  if (pathname === '/api') {
    return apiHandler(req, res);
  }

  next();
};

module.exports = { apiRouter };
