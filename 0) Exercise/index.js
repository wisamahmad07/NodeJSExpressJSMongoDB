// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/genres")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`start listening on port ${port}...`));
