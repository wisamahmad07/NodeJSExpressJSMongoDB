module.exports = function (err, req, res, next) {
  //logging exception
  res.status(500).send("Internal Server Error");
};
