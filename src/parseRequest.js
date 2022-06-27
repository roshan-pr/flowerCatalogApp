const parseRequestLine = (line) => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, uri, httpVersion };
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const parsedRequestLine = parseRequestLine(lines[0]);
  return { ...parsedRequestLine };
};

module.exports = { parseRequest };
