module.exports = function authentication(req, res, next) {
  console.log("authentication...");
  next();
};
