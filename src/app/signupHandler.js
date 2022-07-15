const { readFile } = require('./readFileContent.js');
const express = require('express');

const persistUserDetails = (req) => {
  const { username, password } = req.body;
  req.users[username] = { username, password };
  req.persistUsers(JSON.stringify(req.users));
};

const serveSignupPage = (req, res) => {
  const signupPage = readFile('template/signupTemplate.html');
  res.setHeader('content-type', 'text/html');
  res.end(signupPage);
};

const isUsernameExists = (req) => {
  const { users, body: { username } } = req;
  return users[username];
};

const serveErrorCode = (res) =>
  res.status(409).end('username exists');

const signupUser = (req, res) => {
  if (isUsernameExists(req)) {
    serveErrorCode(res);
    return;
  }
  persistUserDetails(req);

  res.statusCode = 200;
  res.end('successful');
  return;
};

module.exports = { signupUser, serveSignupPage };
