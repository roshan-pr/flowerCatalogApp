const { User, Users } = require("./userProfile.js");

const setUsers = () => {
  const users = new Users();
  return (request) => {
    request.users = users;
  }
};

const handleResponse = (response, users) => {
  response.statusCode = 200;
  response.setHeader('content-type', 'text/plain');
  response.send(users.list());
  return true;
};

const commentHandler = (request, response) => {
  const { name, comment } = request.queryParams;
  if (name && comment) {
    const { users } = request;
    users.addUser(name, comment);
    handleResponse(response, users);
  };
  return false;
};

module.exports = { setUsers, commentHandler };