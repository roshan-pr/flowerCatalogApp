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
  const { url, guestbook } = request;
  const { name, comment } = getGuestbookParams(url);
  guestbook.addEntry(name, comment);
  request.saveComments(guestbook);

  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.end('');
  return true;
};

const createGuestbookHandler = (request, response) => {
  const { pathname } = request.url;

  if (pathname === '/guest-book' && request.method === 'GET') {
    return guestbookHandler(request, response);
  }

  if (pathname === '/add-comment' && request.method === 'GET') {
    return commentHandler(request, response);
  }

  return false;
};

module.exports = { createGuestbookHandler };
