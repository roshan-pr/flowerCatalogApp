const fs = require('fs');

const createPage = (req, res) => {
  const htmlPage = req.guestbook.toHtml();
  res.setHeader('content-type', 'text/html');
  res.end(htmlPage);
};

const saveComment = ({ bodyParams, guestbook }, res) => {
  const { name, comment } = bodyParams
  guestbook.addEntry(name, comment);
  guestbook.saveComments();

  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.end('');
};

const guestbookHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (!req.session && pathname === '/guest-book') {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
    return;
  }

  if (pathname === '/guest-book' && req.method === 'GET') {
    createPage(req, res);
    return;
  }

  if (pathname === '/add-comment' && req.method === 'POST') {
    saveComment(req, res);
    return;
  }
  next();
};

module.exports = { guestbookHandler };
