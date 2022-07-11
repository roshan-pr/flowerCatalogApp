const createCommentElement = (commentInfo) => {
  const { name, comment, date } = commentInfo;
  const nameElement = document.createElement('td');
  nameElement.innerText = name;

  const commentElement = document.createElement('td');
  commentElement.innerText = comment;

  const dateElement = document.createElement('td');
  dateElement.innerText = date;

  const rowElement = document.createElement('tr');
  rowElement.appendChild(dateElement);
  rowElement.appendChild(nameElement);
  rowElement.appendChild(commentElement);

  return rowElement;
};

const updateTable = xhr => {
  console.log('Updating table');
  const comments = JSON.parse(xhr.response);

  const tBodyElement = document.querySelector('tbody');
  tBodyElement.innerText = '';
  comments.forEach(comment => {
    const rowElement = createCommentElement(comment);
    tBodyElement.appendChild(rowElement);
  });
};

const performXHR = (method, url, callback, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      callback(xhr);
    };
  };
  xhr.open(method, url);
  xhr.send(body);
};

const requestForComments = () => {
  const commentsUrl = '/api/comments';
  performXHR('GET', commentsUrl, updateTable);
};

const sendComment = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const body = new URLSearchParams(formData);

  performXHR('POST', '/add-comment', requestForComments, body.toString());

  form.reset();
};

const main = () => {
  document.querySelector('.submit').onclick = sendComment;
};

window.onload = main;
