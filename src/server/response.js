const EOF = '\r\n';

const getCodeMessage = (code) => {
  const codeMessage = {
    200: 'OK',
    404: 'file not found'
  };
  return codeMessage[code];
};

const getStatusLine = (code) => {
  const message = getCodeMessage(code);
  return ['HTTP/1.1', code, message].join(' ') + EOF;
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  get statusCode() {
    return this.#statusCode;
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  setHeader(field, value) {
    this.#headers[field] = value;
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(([field, value]) => {
      this.#write(`${field}:${value}${EOF}`);
    });
  }

  #write(response) {
    this.#socket.write(response);
  }

  #end() {
    this.#socket.end();
  }

  send(body) {
    this.setHeader('content-length', body.length);

    this.#write(getStatusLine(this.#statusCode));
    this.#writeHeaders();
    this.#write(EOF);
    this.#write(body);
    this.#end();
  }
}

module.exports = { Response };
