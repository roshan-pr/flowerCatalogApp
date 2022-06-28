class Log {
  #name;
  #comment;
  #date;

  constructor(username, comment, date) {
    this.#name = username;
    this.#comment = comment;
    this.#date = date;
  }

  get name() {
    return this.#name;
  }

  get comment() {
    return this.#comment;
  }

  get date() {
    return this.#date;
  }
}

const tr = rowContent => `<tr>${rowContent}</tr>`;

const td = data => `<td>${data}</td>`;

const tbody = body => `<tbody>${body}</tbody>`;

class Guestbook {
  #logs;

  constructor() {
    this.#logs = [];
  }

  enter(name, comment) {
    this.#logs.push(new Log(name, comment, new Date().toLocaleString()));
  }

  comments() {
    return this.#logs.reverse().map(
      (log) => [log.date, log.name, log.comment]);
  }

  html() {
    const body = this.comments().map(log => {
      const raw = log.map(data => td(data)).join('');
      return tr(raw);
    }).join('');
    return tbody(body);
  }
}

module.exports = { Guestbook };
