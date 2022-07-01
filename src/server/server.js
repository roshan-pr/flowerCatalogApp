const { createServer } = require('http');
const { URL } = require('url');

const startServer = (port, handler) => {
  const server = createServer((request, response) => {
    request.url = new URL(request.url, 'http://' + request.headers.host);
    handler(request, response);
  });

  server.listen(port, () =>
    console.log(`Server listening to ${server.address().port}`));
};

module.exports = { startServer };
