const genres = require("../routes/genres");
const users = require("../routes/users");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const auth = require("../routes/auth");
const express = require("express");
const ErrorLogger = require("../configuration/uncaughtExceptionErrors");
const error = require("../middleware/error");
const cors = require("cors");

module.exports = function (app) {
  // Enable CORS for your frontend origin
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      exposedHeaders: ["x-auth-token"],
    })
  );
  app.use(express.json());

  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use(error(ErrorLogger));
};
