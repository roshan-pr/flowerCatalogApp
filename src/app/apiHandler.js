const apiHandler = (req, res) => {
  const { pathname } = req.url;
  if (pathname.startsWith('/api/')) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(req.guestbook.comments));
    return true;
  }
};
exports.apiHandler = apiHandler;
