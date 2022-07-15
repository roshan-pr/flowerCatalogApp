const express = require('express');

const serveGuestbook = (req, res) => {
  const { username } = req.session;
  const htmlPage = req.guestbook.toHtml(username);
  res.setHeader('content-type', 'text/html');
  res.end(htmlPage);
};

const redirectToLogin = (req, res) => {
  res.redirect('/login');
  res.status(302).end();
};

const addComment = ({ body, guestbook, session }, res) => {
  const { comment } = body;
  const name = session.username;
  guestbook.addEntry(name, comment);
  guestbook.saveComments();

  res.status(201).end('successful');
};

const serveGuestbookPage = (req, res) => {
  const session = req.session;
  if (!session) {
    return redirectToLogin(req, res);
  };
  return serveGuestbook(req, res);
};

const apiHandler = (req, res) => {
  const { guestbook } = req;
  res.status(200);
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestbook.comments));
};

const guestbookRouter = express.Router();
guestbookRouter.get('/', serveGuestbookPage);
guestbookRouter.get('/api/comments', apiHandler);
guestbookRouter.post('/add-comment', addComment);

module.exports = guestbookRouter;
