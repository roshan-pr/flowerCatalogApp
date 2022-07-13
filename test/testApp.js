const request = require('supertest');
const { app } = require('../src/app.js');

const identity = x => x;

const appSetup = {
  commentsFilePath: './test/data/comments.json',
  templatePath: './test/data/guestbookTemplate.html',
  staticFilePath: './public',
};

describe('GET /unknown', () => {
  it('Should serve 404 with no file found as body', (done) => {
    const appRoute = app(appSetup, identity);
    request(appRoute)
      .get('/unknown')
      .expect('content-type', 'text/plain')
      .expect('file not found')
      .expect(404, done)
  });
});

describe('GET /login', () => {
  it('Should serve the login page', (done) => {
    const appRoute = app(appSetup, identity);
    request(appRoute)
      .get('/login')
      .expect('content-type', 'text/html')
      .expect('content-length', '793')
      .expect(/Login/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('Should login valid user', (done) => {
    const appRoute = app(appSetup, identity);
    request(appRoute)
      .post('/login')
      .send('username=a&password=a')
      .expect('location', '/guest-book')
      .expect(302, done)
  });
});

describe('staticHandler', () => {
  it('Should serve the homepage for GET /', (done) => {
    const appRoute = app(appSetup, identity);
    request(appRoute)
      .get('/')
      .expect(200, done)
      .expect('content-type', 'text/html')
      .expect('content-length', '950')
      .expect(/Home page/)
  });

  it('Should serve the styles for GET /style.css', (done) => {
    const appRoute = app(appSetup, identity);
    request(appRoute)
      .get('/css/guestbookStyle.css')
      .expect(200, done)
      .expect('content-type', 'text/css')
      .expect('content-length', '309')
      .expect(/^body/)
  });

  it('Should serve the script.js for GET /script.js', (done) => {
    const appRoute = app(appSetup, identity);
    request(appRoute)
      .get('/script/guestbookScript.js')
      .expect(200, done)
      .expect('content-type', 'application/javascript')
      .expect('content-length', '1627')
      .expect(/window.onload = main;/)
  });
});
