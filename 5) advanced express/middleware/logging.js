module.exports = function logging(req, res, next) {
  console.log("logging...");
  next();
};
