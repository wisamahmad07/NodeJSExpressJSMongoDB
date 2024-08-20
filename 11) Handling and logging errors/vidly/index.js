const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

require("./startup/ErrorsLogging")();
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();

// throw new Error("Unhandled Error Exception");
// const p = Promise.reject(new Error("Unhandled Promise Rejection"));
// p.then((ex) => console.log(ex));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
