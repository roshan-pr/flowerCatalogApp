const fs = require('fs');

const generateGuestbookPage = (guestbook) => {
  const guestbookPage = fs.readFileSync('./rsc/guestbookTemplate.html', 'utf-8');
  const content = guestbookPage.replace('__BODY__', guestbook.html());
  return content;
};

const handleGuestbook = (request, response) => {
  const htmlPage = generateGuestbookPage(request.guestbook);
  response.setHeader('content-type', 'text/html');
  response.end(htmlPage);
  return true;
};

const getGuestbookParams = ({ searchParams }) => {
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

const commentHandler = (request, response) => {
  const { name, comment } = getGuestbookParams(request.url);
  const { guestbook } = request;
  guestbook.addEntry(name, comment);

  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.end('');
  return true;
};

const createGuestbookHandler = guestbook => (request, response) => {
  const { pathname } = request.url;
  if (pathname === '/guest-book' && request.method === 'GET') {
    request.guestbook = guestbook;
    return handleGuestbook(request, response);
  }

  if (pathname === '/add-comment' && request.method === 'GET') {
    request.guestbook = guestbook;
    return commentHandler(request, response);
  }

  return false;
};

module.exports = { createGuestbookHandler };
