const noFileHandler = (req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-type', 'text/plain');
  res.end('file not found');
};

module.exports = { noFileHandler };
