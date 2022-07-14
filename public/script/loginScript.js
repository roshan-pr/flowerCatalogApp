const xhrRequest = (method, url, callback, body = '', errCb = identity) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      callback(xhr);
      return;
    };
    errCb(xhr);
  };
  xhr.open(method, url);
  xhr.send(body);
};

const redirectToGuestbook = () =>
  window.location.assign('/guest-book');

const displayWrongCredential = viewElement => () =>
  viewElement.innerText = 'Invalid username or password';

const loginRequest = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const body = new URLSearchParams(formData);

  const messageElement = document.querySelector('.errMsg');
  xhrRequest(
    'POST',
    '/login',
    redirectToGuestbook,
    body.toString(),
    displayWrongCredential(messageElement));

  form.reset();
};

const main = () => {
  const loginBtn = document.querySelector('.login-button');
  loginBtn.onclick = loginRequest;
};

window.onload = main
