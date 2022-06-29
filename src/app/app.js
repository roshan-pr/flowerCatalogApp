const fs = require('fs');
const { createRouter } = require('../server/router.js');
const { staticFileFrom } = require('./staticFileHandler.js');
const { noFileHandler } = require('./noFileHandler.js');
const { createGuestbookHandler } = require('./guestbookHandler.js');
const { logRequestHandler } = require('./handlerLib.js');
const { Guestbook } = require('./guestbook.js');
const { loadGuestbook } = require('./loadGuestbook.js');

const createGuestbook = (htmlTemplate, content) => {
  const comments = content.length > 0 ? JSON.parse(content) : [];
  return new Guestbook(comments, htmlTemplate);
};

const app = (staticFilePath) => {
  const templatePath = './template/guestbookTemplate.html';
  const commentPath = './data/comments.json';
  const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  const content = fs.readFileSync(commentPath, 'utf8');
  const guestbook = createGuestbook(htmlTemplate, content);

  const handlers = [
    logRequestHandler,
    loadGuestbook(guestbook, commentPath),
    createGuestbookHandler,
    staticFileFrom(staticFilePath),
    noFileHandler];

  return createRouter(handlers);
};

module.exports = { app };
