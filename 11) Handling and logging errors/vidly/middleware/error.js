module.exports = function (logger) {
  return (err, req, res, next) => {
    //logging exception
    logger.error(err.message, err);
    res.status(500).send("Internal Server Error");
  };
};
