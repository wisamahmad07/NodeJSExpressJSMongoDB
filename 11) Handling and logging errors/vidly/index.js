const express = require("express");
const app = express();

require("./startup/config")(app);
require("./startup/ErrorsLogging")();
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/joiValidation")();

// throw new Error("Unhandled Error Exception");
// const p = Promise.reject(new Error("Unhandled Promise Rejection"));
// p.then((ex) => console.log(ex));
