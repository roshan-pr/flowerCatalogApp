const { createApp } = require('./src/app.js');

const getAppConfig = (staticFilePath = './public') => {
  return {
    commentsFilePath: './data/comments.json',
    usersFilePath: './data/users.json',
    templatePath: './template/guestbookTemplate.html',
    loginPageTemplate: './template/loginTemplate.html',
    staticFilePath,
  };
};

const logger = req => console.log(req.method, req.url);

const main = (config) => {
  const session = {};
  const app = createApp(config, logger, session);
  app.listen(8000, () => console.log('listening to 8000'))
};

main(getAppConfig(process.argv[2]));
