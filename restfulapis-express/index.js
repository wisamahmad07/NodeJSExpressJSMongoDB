const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello world !!!wx</h1>");
});
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on ${port}...`));
