const { server } = require('./src/server/server.js');
const { createHandler } = require('./src/app/createHandler.js');

const startServer = (directory) => {
  const port = 8000;
  server(port, createHandler(directory));
};

startServer(...process.argv.slice(2));
