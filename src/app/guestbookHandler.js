const fs = require('fs');

const createPage = (req, res) => {
  const { username } = req.session;
  const htmlPage = req.guestbook.toHtml(username);
  res.setHeader('content-type', 'text/html');
  res.end(htmlPage);
};

const saveComment = ({ bodyParams, guestbook, session }, res) => {
  const { comment } = bodyParams
  const name = session.username;
  guestbook.addEntry(name, comment);
  guestbook.saveComments();

  res.statusCode = 201;
  res.end('successful');
};

const redirectToLogin = (req, res) => {
  res.statusCode = 302;
  res.setHeader('location', '/login');
  res.end();
};

const guestbookHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/guest-book' && pathname !== 'add-comment') {
    next();
    return;
  }
  if (!req.session) {
    redirectToLogin(req, res);
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
