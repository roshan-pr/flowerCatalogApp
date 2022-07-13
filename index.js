const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

const appConfig = (staticFilePath = './public') => {
  return {
    templatePath: './template/guestbookTemplate.html',
    staticFilePath,
    commentsFilePath: './data/comments.json'
  };
};

const main = (staticPath) => {
  const config = appConfig(staticPath);
  startServer(8000, app(config));
};

main(process.argv[2]);
