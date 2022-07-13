const request = require('supertest');
const { app } = require('../src/app.js');

const getFilePaths = () => {
  const commentsFilePath = './test/data/comments.json';
  const templatePath = './test/data/guestbookTemplate.html';
  const staticFilePath = './public';
  return { commentsFilePath, templatePath, staticFilePath };
};

describe('GET /unknown', () => {
  it('Should serve 404 with no file found as body', (done) => {
    const appRoute = app(getFilePaths());
    request(appRoute)
      .get('/unknown')
      .expect('content-type', 'text/plain')
      .expect('file not found')
      .expect(404, done)
  });
});

describe('staticHandler', () => {
  it('Should serve the homepage for GET /', (done) => {
    const appRoute = app(getFilePaths());
    request(appRoute)
      .get('/')
      .expect(200, done)
      .expect('content-type', 'text/html')
      .expect('content-length', '950')
      .expect(/Home page/)
  });

  it('Should serve the styles for GET /style.css', (done) => {
    const appRoute = app(getFilePaths());
    request(appRoute)
      .get('/css/guestbookStyle.css')
      .expect(200, done)
      .expect('content-type', 'text/css')
      .expect('content-length', '309')
      .expect(/^body/)
  });

  it('Should serve the script.js for GET /script.js', (done) => {
    const appRoute = app(getFilePaths());
    request(appRoute)
      .get('/script/guestbookScript.js')
      .expect(200, done)
      .expect('content-type', 'application/javascript')
      .expect('content-length', '1627')
      .expect(/window.onload = main;/)
  });
});
