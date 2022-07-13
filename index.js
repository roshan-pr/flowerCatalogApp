const { startServer } = require('./src/server/server.js');
const { createApp } = require('./src/app.js');

const getAppConfig = (staticFilePath = './public') => {
  return {
    commentsFilePath: './data/comments.json',
    usersFilePath: './data/users.json',
    templatePath: './template/guestbookTemplate.html',
    staticFilePath,
  };
};

const logger = req => console.log(req.method, req.url.pathname);

const main = (config) => {
  const session = {};
  startServer(8000, createApp(config, logger, session));
};

main(getAppConfig(process.argv[2]));
