const fs = require('fs');
const { readFile } = require('./readFileContent.js');

const writeFile = (filename, content) =>
  fs.writeFileSync(filename, content, 'utf8');


const injectSession = (sessions) => (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    next();
    return;
  }
  const { id } = req.cookies;
  req.session = sessions[id];
  next();
};

const injectUsers = () => {
  const filename = './data/users.json';
  const users = readFile(filename).toString() || {};
  console.log(users);
  return (req, res, next) => {
    req.users = users;
    req.persistUsers = (usersData) => writeFile(filename, usersData);
    next();
  }
};

module.exports = { injectSession, injectUsers };
