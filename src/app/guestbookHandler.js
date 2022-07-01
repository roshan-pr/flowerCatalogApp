const fs = require('fs');

const guestbookHandler = (request, response) => {
  const htmlPage = request.guestbook.toHtml();
  response.setHeader('content-type', 'text/html');
  response.end(htmlPage);
};

const commentHandler = (req, res) => {
  const { url, guestbook } = req;
  const { name, comment } = url.bodyParams;
  guestbook.addEntry(name, comment);
  guestbook.saveComments(guestbook);

  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.end('');
};

const createGuestbookHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname === '/guest-book' && req.method === 'GET') {
    guestbookHandler(req, res);
    return;
  }

  if (pathname === '/add-comment' && req.method === 'POST') {
    commentHandler(req, res);
    return;
  }
  next();
};

module.exports = { createGuestbookHandler };
