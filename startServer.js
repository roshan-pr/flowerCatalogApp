const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app/app.js');

const server = (directory) => {
  const port = 8000;
  startServer(port, app(directory));
};

server(...process.argv.slice(2));
