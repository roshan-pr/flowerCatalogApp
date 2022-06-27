const { createServer } = require('net');
const { parseRequest } = require("./parseRequest.js");
const { Response } = require('./response.js');

const server = (port, handler) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      const request = parseRequest(chunk.toString());
      const response = new Response(socket);
      console.log(request);
      handler(request, response);
    });

    socket.on('error', (err) => console.log(err.message));
  });

  server.listen(port, () => console.log(`Server listening to ${port}`));
};

module.exports = { server };
