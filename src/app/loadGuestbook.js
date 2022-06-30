const fs = require('fs');
const { Guestbook } = require('./guestbook.js');

const createGuestbook = (commentPath, templatePath) =>
  new Guestbook(commentPath, templatePath, fs.readFileSync, fs.writeFileSync);

const loadGuestbook = (commentPath, templatePath) => {
  const guestbook = createGuestbook(commentPath, templatePath);
  guestbook.load();

  return (req, res) => {
    const { pathname } = req.url;
    const pathNames = ['/add-comment', '/guest-book', '/api'];
    if (pathNames.includes(pathname)) {
      req.guestbook = guestbook;
    }
    return false;
  };
};
exports.loadGuestbook = loadGuestbook;
