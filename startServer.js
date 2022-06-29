const { startServer } = require('./src/server/server.js');
const { createHandler } = require('./src/app/createHandler.js');

const server = (directory) => {
  const port = 8000;
  startServer(port, createHandler(directory));
};

server(...process.argv.slice(2));
