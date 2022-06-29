const fs = require('fs');
const { createRouter } = require('../server/router.js');
const { staticFileFrom } = require('./serveFileContent.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { Guestbook } = require("./guestbook.js");

const createGuestbook = (htmlTemplate, content) => {
  const comments = content.length > 0 ? JSON.parse(content) : [];
  return new Guestbook(comments, htmlTemplate);
};

const app = (directory) => {
  const templatePath = './template/guestbookTemplate.html';
  const commentPath = './data/comments.json';
  const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  const content = fs.readFileSync(commentPath, 'utf8');
  const guestbook = createGuestbook(htmlTemplate, content);

  const handlers = [
    createGuestbookHandler(guestbook),
    staticFileFrom(directory),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
