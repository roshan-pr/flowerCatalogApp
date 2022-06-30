const fs = require('fs');

const guestbookHandler = (request, response) => {
  const htmlPage = request.guestbook.toHtml();
  response.setHeader('content-type', 'text/html');
  response.end(htmlPage);
  return true;
};

const commentHandler = (req, res) => {
  const { url, guestbook } = req;
  const { name, comment } = req.url.queryParams;
  guestbook.addEntry(name, comment);
  req.saveComments(guestbook);

  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.end('');
  return true;
};

const createGuestbookHandler = (request, response) => {
  const { pathname } = request.url;

  if (pathname === '/guest-book' && request.method === 'GET') {
    return guestbookHandler(request, response);
  }

  if (pathname === '/add-comment' && request.method === 'GET') {
    return commentHandler(request, response);
  }

  return false;
};

module.exports = { createGuestbookHandler };
