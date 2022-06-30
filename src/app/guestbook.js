const tr = rowContent => `<tr>${rowContent}</tr>`;

const td = data => `<td>${data}</td>`;

const tableBody = body => `<tbody>${body}</tbody>`;

class Guestbook {
  #comments
  #commentFileName;
  #tempFileName;
  #readFile
  #writeFile

  constructor(commentFileName, tempFileName, readFile, writeFile) {

    this.#commentFileName = commentFileName;
    this.#tempFileName = tempFileName;
    this.#readFile = readFile;
    this.#writeFile = writeFile;
    this.#comments = [];
  }

  load() {
    const content = this.#readFile('./data/comments.json', 'utf8');
    const commentJson = content.length > 0 ? content : "[]";
    this.#comments = JSON.parse(commentJson);
  }

  saveComments() {
    const allComments = JSON.stringify(this.#comments);
    this.#writeFile(this.#commentFileName, allComments, 'utf8');
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

    const template = this.#readFile(this.#tempFileName, 'utf8');
    return template.replace('__BODY__', tableBody(body));
  }
}

module.exports = { Guestbook };
