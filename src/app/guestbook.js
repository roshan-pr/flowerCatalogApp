const tr = rowContent => `<tr>${rowContent}</tr>`;

const td = data => `<td>${data}</td>`;

const generateHtml = (username, comments, template) => {
  const htmlBody = comments.map(commentInfo => {
    const { name, comment, date } = commentInfo;
    const rawHtml = [date, name, comment].map(data => td(data)).join('');
    return tr(rawHtml);
  }).join('');

  template = template.replace('__BODY__', htmlBody);
  return template.replace('__USERNAME__', username);
};

class Guestbook {
  #comments
  #commentsFilePath;
  #guestbookFilePath;
  #readFile
  #writeFile

  constructor(commentsFilePath, guestbookFilePath, readFile, writeFile) {
    this.#commentsFilePath = commentsFilePath;
    this.#guestbookFilePath = guestbookFilePath;
    this.#readFile = readFile;
    this.#writeFile = writeFile;
    this.#comments = [];
  }

  get comments() {
    return this.#comments;
  }

  load() {
    const content = this.#readFile(this.#commentsFilePath, 'utf8');
    const commentJson = content.length > 0 ? content : "[]";
    this.#comments = JSON.parse(commentJson);
  }

  saveComments() {
    const allComments = JSON.stringify(this.#comments);
    this.#writeFile(this.#commentsFilePath, allComments, 'utf8');
  }

  addEntry(name, comment) {
    this.#comments.unshift({ name, comment, date: new Date().toLocaleString() });
  }

  getCommentsBy(name) {
    return this.#comments.filter(comment => comment.name === name);
  }

  toHtml(username) {
    const allComments = this.#comments;
    const template = this.#readFile(this.#guestbookFilePath, 'utf8');
    return generateHtml(username, allComments, template);
  }
}

module.exports = { Guestbook };
