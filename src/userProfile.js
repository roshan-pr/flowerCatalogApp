class Log {
  #name;
  #comment;
  #date;

  constructor(username, comment, date) {
    this.#name = username;
    this.#comment = comment;
    this.#date = date;
  }

  get username() {
    return this.#name;
  }

  get comment() {
    return this.#comment;
  }

  get date() {
    return this.#date;
  }
}

class Guestbook {
  #logs;

  constructor() {
    this.#logs = [];
  }

  enter(name, comment) {
    this.#logs.push(new Log(name, comment, new Date()));
  }

  list() {
    const list = this.#logs.reverse().map(
      (user) => [user.date, user.username, user.comment].join(','));
    return list.join('\n');
  }
}

module.exports = { Guestbook };
