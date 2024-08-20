require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const rejectLogger = require("./configuration/unhandledRejectionPromise");
const ErrorLogger = require("./configuration/uncaughtExceptionErrors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/database")();

if (!process.env.jwtPrivateKey) {
  console.log("FATAL ERROR");
  process.exit(1);
}

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
      //ex for db only
      // ex: [ex.stack, ex.message, ex.name],
    },
  });
});

// throw new Error("Unhandled Error Exception");
const p = Promise.reject(new Error("Unhandled Promise Rejection"));
p.then((ex) => console.log(ex));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
