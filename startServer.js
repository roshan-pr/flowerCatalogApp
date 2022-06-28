const { server } = require('./src/server.js');
const { createHandler } = require('./src/createHandler.js');

const startServer = (directory) => {
  const port = 8000;
  server(port, createHandler(directory));
};

startServer(...process.argv.slice(2));
