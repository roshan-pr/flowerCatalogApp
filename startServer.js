const { serveFileContent } = require('./src/serveFileContent.js');
const { noFileHandler } = require('./src/noFileHandler.js');
const { server } = require('./src/server.js');

const createHandler = (directory) => {
  const handlers = [serveFileContent(directory), noFileHandler];
  return (request, response) =>
    handlers.some((handler) => handler(request, response));
};

const startServer = (directory) => {
  const port = 8000;
  server(port, createHandler(directory));
};

startServer(...process.argv.slice(2));
