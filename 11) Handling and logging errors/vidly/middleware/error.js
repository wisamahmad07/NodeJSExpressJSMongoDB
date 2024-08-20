module.exports = function (logger) {
  return (err, req, res, next) => {
    logger.info(err.message, {
      meta: {
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        headers: req.headers,
      },
    });

    res.status(500).send("Internal Server Error");
  };
};
/* //logging exception levels
        {
          "error": 0,   // Error: indicates error conditions
          "warn": 1,    // Warning: indicates warning conditions
          "info": 2,    // Info: informational messages
          "http": 3,    // HTTP: HTTP request/response logging
          "verbose": 4, // Verbose: more detailed messages
          "debug": 5,   // Debug: debug-level messages
          "silly": 6    // Silly: very detailed messages, often only useful for debugging
        } */
