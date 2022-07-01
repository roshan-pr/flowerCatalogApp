const fs = require('fs');
const { Guestbook } = require('./guestbook.js');

const createGuestbook = (commentFilePath, tempFilePath) =>
  new Guestbook(commentFilePath, tempFilePath, fs.readFileSync, fs.writeFileSync);

const loadGuestbook = (commentPath, templatePath) => {
  const guestbook = createGuestbook(commentPath, templatePath);
  guestbook.load();

  return (req, res, next) => {
    const { pathname } = req.url;
    const pathNames = ['/add-comment', '/guest-book', '/api'];
    if (pathNames.includes(pathname)) {
      req.guestbook = guestbook;
    }
    next();
  };
};
exports.loadGuestbook = loadGuestbook;
