const fs = require('fs');

const generateGuestbookPage = (guestbook) => {
  const guestbookPage = fs.readFileSync('./rsc/guestbookTemplate.html', 'utf-8');
  const content = guestbookPage.replace('__BODY__', guestbook.html());
  return content;
};

const handleGuestbook = (request, response) => {
  const htmlPage = generateGuestbookPage(request.guestbook);
  response.setHeader('content-type', 'text/html');
  response.send(htmlPage);
  return true;
};

const redirectToGuestbook = (response) => {
  response.statusCode = 302;
  response.setHeader('location', '/guestbook.html');
  response.send('');
  return true;
};

const addComment = (request) => {
  const { name, comment } = request.queryParams;
  const { guestbook } = request;
  guestbook.addEntry(name, comment);
};

const createGuestbookHandler = guestbook => (request, response) => {
  const { uri } = request;
  if (uri === '/guestbook.html') {
    request.guestbook = guestbook;
    return handleGuestbook(request, response);
  }

  if (uri === '/add-comment') {
    request.guestbook = guestbook;
    addComment(request);
    return redirectToGuestbook(response);
  }

  return false;
};

module.exports = { createGuestbookHandler };
