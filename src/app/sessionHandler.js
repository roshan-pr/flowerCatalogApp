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

const injectUsers = (usersFilePath) => {
  const userDetails = readFile(usersFilePath).toString();
  const users = JSON.parse(userDetails) || {};
  return (req, res, next) => {
    req.users = users;
    req.persistUsers = (usersData) => writeFile(usersFilePath, usersData);
    next();
  }
};

module.exports = { injectSession, injectUsers };
