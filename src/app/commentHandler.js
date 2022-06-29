const { Guestbook } = require("./guestbook.js");

const setGuestbook = () => {
  const guestbook = new Guestbook();
  return (request) => {
    request.guestbook = guestbook;
  }
};

const redirectToGuestbook = (response, guestbook) => {
  response.statusCode = 302;
  response.setHeader('location', '/guestbook.html');
  response.send('');
  return true;
};

const commentHandler = (request, response) => {
  const { name, comment } = request.queryParams;
  if (name && comment) {
    const { guestbook } = request;
    guestbook.enter(name, comment);
    redirectToGuestbook(response, guestbook);
  };
};

module.exports = { setGuestbook, commentHandler };