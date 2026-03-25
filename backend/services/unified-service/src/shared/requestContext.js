function getUserIdFromReq(req) {
  return req.headers["x-user-id"];
}

module.exports = { getUserIdFromReq };
