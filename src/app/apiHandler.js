const { parseParams } = require("./lib");

const apiHandler = ({ guestbook }, res) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestbook.comments));
};

const apiRequestHandler = ({ queryParams, guestbook }, res) => {
  const { name } = queryParams;
  const comments = guestbook.searchComments(name);

  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(comments));
};

const apiRouter = (req, res, next) => {
  const { pathname, searchParams } = req.url;
  const queryParams = parseParams(searchParams);

  if (pathname === '/api' && queryParams.name) {
    req.queryParams = queryParams;
    return apiRequestHandler(req, res);
  }

  if (pathname === '/api') {
    return apiHandler(req, res);
  }

  next();
};

module.exports = { apiRouter };
