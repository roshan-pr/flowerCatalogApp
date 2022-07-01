const createNextHandler = (handlers) => {
  let index = -1;
  const callNext = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => callNext(req, res));
    };
  }
  return callNext;
};

const createRouter = (handlers) => {
  return (req, res) => {
    const next = createNextHandler(handlers);
    next(req, res, next);
  }
};

module.exports = { createRouter };
