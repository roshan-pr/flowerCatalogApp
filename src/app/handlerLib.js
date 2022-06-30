const logRequestHandler = (request) =>
  console.log(request.method, request.url.pathname, request.url.queryParams);

module.exports = { logRequestHandler };