const parseQueries = (queryStrings) => {
  const queryParams = {};
  const queries = queryStrings.split('&');
  queries.forEach(query => {
    const [param, value] = query.split('=');
    queryParams[param] = value;
  });
  return queryParams;
};

const parseUri = (paramString) => {
  let queryParams = {};
  const [uri, queryStrings] = paramString.split('?');

  if (queryStrings) {
    queryParams = parseQueries(queryStrings);
  }
  return { uri, queryParams };
};

const parseRequestLine = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  return { method, ...parseUri(rawUri), httpVersion };
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const parsedRequestLine = parseRequestLine(lines[0]);
  return { ...parsedRequestLine };
};

module.exports = { parseRequest };
