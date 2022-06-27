class User {
  #username;
  #comment;
  #date;

  constructor(username, comment, date) {
    this.#username = username;
    this.#comment = comment;
    this.#date = date;
  }

  get username() {
    return this.#username;
  }

  get comment() {
    return this.#comment;
  }

  get date() {
    return this.#date;
  }
}

class Users {
  #users;

  constructor() {
    this.#users = [];
  }

  addUser(name, comment) {
    this.#users.push(new User(name, comment, new Date()));
  }

  list() {
    const list = this.#users.reverse().map(
      (user) => [user.date, user.username, user.comment].join(','));
    return list.join('\n');
  }
}

module.exports = { User, Users };
