const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

const getAppConfig = (staticFilePath = './public') => {
  return {
    commentsFilePath: './data/comments.json',
    templatePath: './template/guestbookTemplate.html',
    staticFilePath,
  };
};

const logger = req => console.log(req.method, req.url.pathname);

const main = (config) => {
  startServer(8000, app(config, logger));
};

main(getAppConfig(process.argv[2]));
