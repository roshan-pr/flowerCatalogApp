const request = require('supertest');
const { createApp } = require('../src/app.js');

const noOperation = () => { };
const logger = (req) => console.log(req.method, req.url.pathname);;

const appSetup = {
  commentsFilePath: './test/data/comments.json',
  usersFilePath: './data/users.json',
  templatePath: './test/data/guestbookTemplate.html',
  staticFilePath: './public',
};

describe('GET /unknown', () => {
  it('Should serve 404 with no file found as body', (done) => {
    const app = createApp(appSetup, noOperation);
    request(app)
      .get('/unknown')
      .expect('content-type', 'text/plain')
      .expect('file not found')
      .expect(404, done)
  });
});

describe('staticHandler', () => {
  it('Should serve the homepage for GET /', (done) => {
    const app = createApp(appSetup, noOperation);
    request(app)
      .get('/')
      .expect(200, done)
      .expect('content-type', 'text/html')
      .expect('content-length', '950')
      .expect(/Home page/)
  });

  it('Should serve the styles for GET /style.css', (done) => {
    const app = createApp(appSetup, noOperation);
    request(app)
      .get('/css/guestbookStyle.css')
      .expect(200, done)
      .expect('content-type', 'text/css')
      .expect('content-length', '309')
      .expect(/^body/)
  });

  it('Should serve the script.js for GET /script.js', (done) => {
    const app = createApp(appSetup, noOperation);
    request(app)
      .get('/script/guestbookScript.js')
      .expect(200, done)
      .expect('content-type', 'application/javascript')
      .expect('content-length', '1627')
      .expect(/window.onload = main;/)
  });
});

describe('GET /login', () => {
  let app;
  beforeEach(() => {
    const sessions = { '123': { sessionId: 123, username: 'abc' } };
    app = createApp(appSetup, noOperation, sessions);
  });

  it('Should serve guestbook when user already logged in', (done) => {
    request(app)
      .get('/login')
      .set('Cookie', ['id=123']) // Already logged in and received cookie
      .expect('location', '/guest-book')
      .expect(302, done)
  });

  it('Should serve login page', (done) => {
    request(app)
      .get('/login')
      .expect('content-type', 'text/html')
      .expect('content-length', '793')
      .expect(/Login page/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  let app;
  beforeEach(() => {
    const sessions = { '123': { sessionId: 123, username: 'abc' } };
    app = createApp(appSetup, noOperation, sessions);
  });

  it('Should direct to guestbook for valid user', (done) => {
    request(app)
      .post('/login')
      .send('username=a&password=a')
      .expect('location', '/guest-book')
      .expect(302, done)
  });

  it('Should direct to signup for invalid user', (done) => {
    request(app)
      .post('/login')
      .send('username=unknown&password=unknown')
      .expect('location', '/signup')
      .expect(302, done)
  });

});
