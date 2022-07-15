const apiHandler = (req, res) => {
  const { guestbook } = req;
  res.status(200);
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestbook.comments));
};

module.exports = { apiHandler };
