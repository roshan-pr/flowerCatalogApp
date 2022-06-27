const fs = require('fs');
const { createServer } = require('net');
const { parseRequest } = require("./parseRequest.js");

const html = header => `<html><body><h1>${header}</h1></body></html>`;
const EOF = '\n\r';

const handler = ({ uri }, socket) => {
  let message = html('error');
  if (uri === '/') {
    const content = fs.readFileSync('./src/homePage.html');
    message = html(content);
  };

  socket.write(['HTTP/1.1', 200, 'ok'].join(' ') + EOF);
  socket.write(EOF);
  socket.write(message);
  socket.end();
};

const startServer = (port) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      const request = parseRequest(chunk.toString());
      console.log(request);
      handler(request, socket);
    });
  });

  server.listen(port, () => console.log(`Server listening to ${port}`));
};

startServer(8000);
