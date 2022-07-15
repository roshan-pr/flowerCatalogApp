const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app.js');

const noOperation = () => { };
const logger = (req) => console.log(req.method, req.url);

const appSetup = () => {
  const commentsFilePath = './test/data/comments.json';
  const usersFilePath = './test/data/users.json';
  const templatePath = './template/guestbookTemplate.html';
  const staticFilePath = './public';
  const loginPageTemplate = './template/loginTemplate.html';
  fs.writeFileSync(commentsFilePath, '[{"name":"name","comment":"hello","date":"dd/mm/yyyy, HH:MM:SS"}]');
  return {
    commentsFilePath,
    usersFilePath,
    templatePath,
    staticFilePath,
    loginPageTemplate
  }
};

describe('GET /unknown', () => {
  it('Should serve 404 with no file found as body', (done) => {
    const app = createApp(appSetup(), noOperation);
    request(app)
      .get('/unknown')
      .expect('content-type', 'text/plain')
      .expect('file not found')
      .expect(404, done)
  });
});

describe('staticHandler', () => {
  it('Should serve the homepage for GET /', (done) => {
    const app = createApp(appSetup(), noOperation);
    request(app)
      .get('/')
      .expect(200, done)
      .expect('content-type', /text\/html/)
      .expect('content-length', '942')
      .expect(/Home page/)
  });

  it('Should serve the styles for GET /style.css', (done) => {
    const app = createApp(appSetup(), noOperation);
    request(app)
      .get('/css/guestbookStyle.css')
      .expect('content-type', /text\/css/)
      .expect('content-length', '343')
      .expect(/body/)
      .expect(200, done)
  });

  it('Should serve the script.js for GET /script.js', (done) => {
    const app = createApp(appSetup(), noOperation);
    request(app)
      .get('/script/guestbookScript.js')
      .expect(200, done)
      .expect('content-type', /application\/javascript/)
      .expect('content-length', '1650')
      .expect(/window.onload = main;/)
  });
});

describe('GET /login', () => {
  let app;
  beforeEach(() => {
    const sessions = { '123': { sessionId: 123, username: 'abc' } };
    app = createApp(appSetup(), noOperation, sessions);
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
      .expect('content-length', '871')
      .expect(/Login page/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  let app;
  beforeEach(() => {
    const sessions = { '123': { sessionId: 123, username: 'abc' } };
    app = createApp(appSetup(), noOperation, sessions);
  });

  it('Should direct to guestbook for valid user', (done) => {
    request(app)
      .post('/login')
      .send('username=name&password=a')
      .expect('location', '/guest-book')
      .expect(302, done)
  });

  it('Should respond 401 for invalid user', (done) => {
    request(app)
      .post('/login')
      .send('username=unknown&password=unknown')
      .expect(401, done)
  });

});

describe('GET /guest-book', () => {
  let app;
  beforeEach(() => {
    const sessions = { '123': { sessionId: 123, username: 'name' } };
    app = createApp(appSetup(), noOperation, sessions);
  });

  it('Should serve guestbook for valid user', (done) => {
    request(app)
      .get('/guest-book')
      .set('Cookie', 'id=123')
      .expect(/Guest Book/)
      .expect('content-length', '1034')
      .expect('content-type', 'text/html')
      .expect(200, done)
  });

  it('Should direct to login page for invalid user', (done) => {
    // For user with no cookie set
    request(app)
      .get('/guest-book')
      .expect('location', '/login')
      .expect(302, done)
  });

});

describe('POST /guest-book/add-comment', () => {
  let app;
  beforeEach(() => {
    const sessions = { '123': { sessionId: 123, username: 'abc' } };
    app = createApp(appSetup(), noOperation, sessions);
  });

  it('Should add comment and return successful msg', (done) => {
    request(app)
      .post('/guest-book/add-comment')
      .set('Cookie', 'id=123')
      .send('name=name&comment=hello')
      // .expect('successful')
      .expect(201, done)
  });
});

describe('GET /signup', () => {
  let app;
  beforeEach(() => {
    app = createApp(appSetup(), noOperation);
  });

  it('Should serve the signup page', (done) => {
    request(app)
      .get('/signup')
      .expect(/Sign-up page/)
      .expect('content-type', 'text/html')
      .expect('content-length', '683')
      .expect(200, done)
  });
});

describe('POST /signup', () => {
  let app;
  beforeEach(() => {
    const users = {
      "name": { "username": "name", "password": "a" }
    }
    fs.writeFileSync(appSetup().usersFilePath, JSON.stringify(users));
    app = createApp(appSetup(), noOperation);
  });

  it('Should serve error code for username exists', (done) => {
    request(app)
      .post('/signup')
      .send('username=name&password=a')
      .expect(409, done)
  });

  it('Should serve successful response after register', (done) => {
    request(app)
      .post('/signup')
      .send('username=unknown&password=a')
      .expect(200, done)
  });
});

describe('GET /guest-book/api/comments', () => {
  it('Should serve the comments', (done) => {
    const app = createApp(appSetup(), noOperation);
    request(app)
      .get('/guest-book/api/comments')
      .expect('content-type', /application\/json/)
      .expect(/\[{"name"/)
      .expect(200, done)
  });
});

describe('GET /logout', () => {
  let app;
  beforeEach(() => {
    const sessions = { '123': { sessionId: 123, username: 'abc' } };
    app = createApp(appSetup(), noOperation, sessions);
  });

  it('Should logout from the guestbook', (done) => {
    request(app)
      .get('/logout')
      .set('Cookie', 'id=123')
      .expect('set-cookie', /id=123.*Expires=/)
      .expect('location', '/')
      .expect(302, done)
  });
});
