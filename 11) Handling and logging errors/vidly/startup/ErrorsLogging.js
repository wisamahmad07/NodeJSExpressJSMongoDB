const rejectLogger = require("../configuration/unhandledRejectionPromise");
const ErrorLogger = require("../configuration/uncaughtExceptionErrors");
require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    console.log("something failed during because of Error");
    ErrorLogger.info(ex.message, {
      meta: { message: ex.message, name: ex.name, stack: ex.stack },
    });
  });
  process.on("unhandledRejection", (ex) => {
    console.log("something failed because of Promise Rejection");
    rejectLogger.info(ex.message, {
      meta: {
        message: ex.message,
        name: ex.name,
        stack: ex.stack,
        // ex for db only
        // ex: [ex.stack, ex.message, ex.name],
      },
    });
  });
};
