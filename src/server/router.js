const createNextHandler = (handlers) => {
  let index = -1;
  const callNext = (req, res) => {
    index++;
    if (handlers[index]) {
      handlers[index](req, res, () => callNext(req, res));
    };
  }
  return callNext;
};

const createRouter = (handlers) => {
  console.log('Handlers :', handlers);
  return (req, res) => {
    const next = createNextHandler(handlers);
    next(req, res, next);
  }
};

module.exports = { createRouter };
