const express = require('express');

const createSession = (username) => {
  const date = new Date();
  return { sessionId: date.getTime(), username }
};

const isValidUser = (req) => {
  const { users, body: { username, password } } = req;
  if (!users[username]) {
    return false;
  }
  return users[username].password === password;
};

const serveLoginPage = (res, loginFileName, readFile) => {
  const loginTemplate = readFile(loginFileName);
  res.setHeader('content-type', 'text/html');
  res.end(loginTemplate);
};

const redirectToGuestbook = (res) => {
  res.redirect('/guest-book');
  res.status(302).end();
};

const serveErrorCode = (res) => {
  res.statusCode = 401;
  res.end();
};

const createLoginPage = (loginFileName, readFile) => (req, res) => {
  if (req.session) {
    return redirectToGuestbook(res);
  }
  return serveLoginPage(res, loginFileName, readFile);
};

const loginUser = (sessions) => (req, res) => {
  if (!isValidUser(req)) {
    serveErrorCode(res);
    return;
  }
  const { username } = req.body;
  const session = createSession(username);
  sessions[session.sessionId] = session;
  res.setHeader('Set-Cookie', `id=${session.sessionId}`);

  redirectToGuestbook(res);
  return;
};

module.exports = { loginUser, createLoginPage };
