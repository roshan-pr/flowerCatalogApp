const tr = rowContent => `<tr>${rowContent}</tr>`;

const td = data => `<td>${data}</td>`;

const tableBody = body => `<tbody>${body}</tbody>`;

class Guestbook {
  #comments;
  #htmlTemplate;

  constructor(comments, htmlTemplate) {
    this.#comments = comments;
    this.#htmlTemplate = htmlTemplate;
  }

  get comments() {
    return this.#comments;
  }

  addEntry(name, comment) {
    this.#comments.unshift({ name, comment, date: new Date().toLocaleString() });
  }

  toHtml() {
    const allComments = this.#comments;

    const body = allComments.map(commentInfo => {
      const { name, comment, date } = commentInfo;
      const rawHtml = [date, name, comment].map(data => td(data)).join('');
      return tr(rawHtml);
    }).join('');

    return this.#htmlTemplate.replace('__BODY__', tableBody(body));
  }
}

module.exports = { Guestbook };
