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
  const comments = JSON.parse(xhr.response);

  const tBodyElement = document.querySelector('tbody');
  tBodyElement.innerText = '';
  comments.forEach(comment => {
    const rowElement = createCommentElement(comment);
    tBodyElement.appendChild(rowElement);
  });
};

const requestForComments = commentsUrl => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => updateTable(xhr);

  xhr.open('GET', commentsUrl);
  xhr.send();
};

const sendComment = () => {
  const xhr = new XMLHttpRequest();

  xhr.onload = event => {
    if (xhr.status === 201) {
      const commentsUrl = '/api/comments';
      requestForComments(commentsUrl);
    };
  };

  xhr.open('POST', '/add-comment');
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const body = new URLSearchParams(formData);
  xhr.send(body.toString());
  form.reset();
};

const main = () => {
  document.getElementById('submitBtn').onclick = sendComment;
};

window.onload = main;
