const noFileHandler = (request, response) => {
  response.StatusCode = 404;
  response.setHeader('Content-type', 'text/plain');
  response.end('file not found');
  return true;
};

module.exports = { noFileHandler };
