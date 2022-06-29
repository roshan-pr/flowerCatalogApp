const logRequestHandler = (request) =>
  console.log(request.method, request.url.pathname, '\n', request.url);

module.exports = { logRequestHandler };