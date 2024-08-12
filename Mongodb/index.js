const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/crud_api")
  .then(() => console.log("Successfully, Connected to MongDB..."))
  .catch((err) => console.error("Error in connecting to MongDB", err));
