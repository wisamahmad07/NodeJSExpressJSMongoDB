// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });
const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`start listening on port ${port}...`));
