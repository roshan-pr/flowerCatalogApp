const fs = require('fs');
const { createRouter } = require('../server/router.js');
const { staticFileFrom } = require('./serveFileContent.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { Guestbook } = require("./guestbook.js");

const createGuestbook = () => {
  const htmlTemplate = fs.readFileSync('./rsc/guestbookTemplate.html', 'utf8');
  const content = fs.readFileSync('./data/comments.json', 'utf8');
  const comments = content.length > 0 ? JSON.parse(content) : [];

  const guestbook = new Guestbook(comments, htmlTemplate);
  guestbook.saveComments = function () {
    const content = JSON.stringify(this.comments);
    fs.writeFileSync('./data/comments.json', content, 'utf-8');
  }
  return guestbook;
};

const createHandler = (directory) => {
  const guestbook = createGuestbook();
  const handlers = [
    createGuestbookHandler(guestbook),
    staticFileFrom(directory),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { createHandler };
