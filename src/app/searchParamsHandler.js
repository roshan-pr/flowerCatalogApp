const searchParamsHandler = (req, res) => {
  const { searchParams } = req.url;
  const params = {};
  for (const [query, value] of searchParams.entries()) {
    params[query] = value;
  }
  req.url.queryParams = params;
  return false;
};
exports.searchParamsHandler = searchParamsHandler;
