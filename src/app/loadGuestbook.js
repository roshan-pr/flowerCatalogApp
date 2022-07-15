const fs = require('fs');
const { Guestbook } = require('./guestbook.js');

const createGuestbook = (commentFilePath, tempFilePath) =>
  new Guestbook(commentFilePath, tempFilePath, fs.readFileSync, fs.writeFileSync);

const loadGuestbook = (commentPath, templatePath) => {
  const guestbook = createGuestbook(commentPath, templatePath);
  guestbook.load();

  return (req, res, next) => {
    req.guestbook = guestbook;
    next();
  };
};

exports.loadGuestbook = loadGuestbook;
