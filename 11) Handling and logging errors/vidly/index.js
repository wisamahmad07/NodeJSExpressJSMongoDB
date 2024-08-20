require("express-async-errors");
const logger = require("./configuration/logger");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const error = require("./middleware/error");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const users = require("./routes/users");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!process.env.jwtPrivateKey) {
  console.log("FATAL ERROR");
  process.exit(1);
}

process.on("uncaughtException", (ex) => {
  console.log("something faild during startup");
  logger.info(ex.message, {
    meta: {
      stack: ex.stack,
      ex,
    },
  });
});

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

throw new Error("index error he bhai sahab");

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use(error(logger));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));