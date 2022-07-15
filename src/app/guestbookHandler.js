const fs = require('fs');

const createPage = (req, res) => {
  const { username } = req.session;
  const htmlPage = req.guestbook.toHtml(username);
  res.setHeader('content-type', 'text/html');
  res.end(htmlPage);
};

const addComment = ({ bodyParams, guestbook, session }, res) => {
  const { comment } = bodyParams;
  const name = session.username;
  guestbook.addEntry(name, comment);
  guestbook.saveComments();

  res.status(201).end('successful');
};

const redirectToLogin = (req, res) => {
  res.redirect('/login');
  res.status(302).end();
};

const serveGuestbookPage = (req, res) => {
  const session = req.session;

  if (!session) {
    return redirectToLogin(req, res);
  };

  return createPage(req, res);
};

module.exports = { serveGuestbookPage, addComment };
