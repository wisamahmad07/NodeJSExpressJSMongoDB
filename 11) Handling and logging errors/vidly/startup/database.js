const mongoose = require("mongoose");
const mongodbLogger = require("../configuration/mongodbConnect");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost:27017/vidly")
    .then(() => mongodbLogger.info("Connected to MongoDB..."));
};
