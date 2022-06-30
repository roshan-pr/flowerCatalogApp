const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app/app.js');

const server = (directory) => {
  const port = 8000;
  const templatePath = './template/guestbookTemplate.html';
  const commentPath = './data/comments.json';
  startServer(port, app(directory, commentPath, templatePath));
};

server(...process.argv.slice(2));
