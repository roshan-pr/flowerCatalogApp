const noFileHandler = (request, response) => {
  response.StatusCode = 404;
  response.setHeader('text/plain');
  response.send('file not found');
  return true;
};

module.exports = { noFileHandler };
