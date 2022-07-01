const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app/app.js');

const appConfig = (commentFilePath) => {
  const commentPath = commentFilePath || './data/comments.json';
  return {
    templatePath: './template/guestbookTemplate.html',
    staticFilePath: './public',
    commentPath
  }
};

const main = (commentPath) => {
  const config = appConfig(commentPath);
  startServer(8000, app(config));
};

main(process.argv[2]);
