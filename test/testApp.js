const request = require('supertest');
const { app } = require('../src/app.js');

const getFilePaths = () => {
  const commentsFilePath = './data/comments.json';
  const templatePath = './data/guestbookTemplate.html';
  const staticFilePath = './data';
  return { commentsFilePath, templatePath, staticFilePath };
};


describe('app', () => {
  it('Should respond with 404 to GET /unknown', (done) => {
    const appRoute = app(getFilePaths());
    request(appRoute)
      .get('/unknown')
      .expect(404)
      .expect('file not found')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
