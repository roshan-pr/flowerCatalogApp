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

const saveComments = (guestbook) => {
  const content = JSON.stringify(guestbook.comments);
  fs.writeFileSync('./data/comments.json', content, 'utf-8');
};

const commentHandler = ({ url, guestbook }, response) => {
  const { name, comment } = getGuestbookParams(url);
  guestbook.addEntry(name, comment);
  saveComments(guestbook);

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
