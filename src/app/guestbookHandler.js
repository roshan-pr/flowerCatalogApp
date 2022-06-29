const fs = require('fs');

const guestbookHandler = (request, response) => {
  const htmlPage = request.guestbook.toHtml();
  response.setHeader('content-type', 'text/html');
  response.end(htmlPage);
  return true;
};

const getGuestbookParams = ({ searchParams }) => {
  const params = {};
  for (const [query, value] of searchParams.entries()) {
    params[query] = value;
  }
  return params;
};

const commentHandler = (request, response) => {
  const { name, comment } = getGuestbookParams(request.url);
  const { guestbook } = request;
  guestbook.addEntry(name, comment);
  guestbook.saveComments();

  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.end('');
  return true;
};

const createGuestbookHandler = guestbook => (request, response) => {
  const { pathname } = request.url;

  if (pathname === '/guest-book' && request.method === 'GET') {
    request.guestbook = guestbook;
    return guestbookHandler(request, response);
  }

  if (pathname === '/add-comment' && request.method === 'GET') {
    request.guestbook = guestbook;
    return commentHandler(request, response);
  }

  return false;
};

module.exports = { createGuestbookHandler };
