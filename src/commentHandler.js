const { Guestbook } = require("./guestbook.js");

const setGuestbook = () => {
  const guestbook = new Guestbook();
  return (request) => {
    request.guestbook = guestbook;
  }
};

const handleResponse = (response, guestbook) => {
  response.statusCode = 200;
  response.setHeader('content-type', 'text/plain');
  response.send(guestbook.list());
  return true;
};

const commentHandler = (request, response) => {
  const { name, comment } = request.queryParams;
  if (name && comment) {
    const { guestbook } = request;
    guestbook.enter(name, comment);
    handleResponse(response, guestbook);
  };
};

module.exports = { setGuestbook, commentHandler };