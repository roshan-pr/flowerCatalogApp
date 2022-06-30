const tr = rowContent => `<tr>${rowContent}</tr>`;

const td = data => `<td>${data}</td>`;

const tableBody = body => `<tbody>${body}</tbody>`;

const generateHtml = (comments, template) => {
  const htmlBody = comments.map(commentInfo => {
    const { name, comment, date } = commentInfo;
    const rawHtml = [date, name, comment].map(data => td(data)).join('');
    return tr(rawHtml);
  }).join('');

  return template.replace('__BODY__', htmlBody);
};

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

  get comments() {
    return this.#comments;
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

  searchComments(name) {
    return this.#comments.filter(comment => comment.name === name);
  }

  toHtml() {
    const allComments = this.#comments;
    const template = this.#readFile(this.#tempFileName, 'utf8');
    return generateHtml(allComments, template);
  }
}

module.exports = { Guestbook };
