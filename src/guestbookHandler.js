const fs = require('fs');

const generateGuestPage = (guestbook) => {
  const guestbookPage = fs.readFileSync('./src/guestbookTemplate.html', 'utf-8');
  const content = guestbookPage.replace('__BODY__', guestbook.html());
  return content;
};

const handleResponse = (response, generatedResponse) => {
  response.setHeader('content-type', 'text/html');
  response.send(generatedResponse);
  return true;
};

const guestbookHandler = (request, response) => {
  const { uri, guestbook } = request;
  if (uri === '/guestbook.html') {
    const htmlPage = generateGuestPage(guestbook);
    handleResponse(response, htmlPage);
    return true;
  }
  return false;
};

module.exports = { guestbookHandler };
