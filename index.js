const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

const appConfig = (commentsFilePath) => {
  commentsFilePath = commentsFilePath || './data/comments.json';
  return {
    templatePath: './template/guestbookTemplate.html',
    staticFilePath: './public',
    commentsFilePath
  }
};

const main = (commentPath) => {
  const config = appConfig(commentPath);
  startServer(8000, app(config));
};

main(process.argv[2]);
