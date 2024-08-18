const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const Joi = require("joi");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

app.use(express.json());
app.use("/api/courses", courses);
app.use("/", home);

console.log(process.env.app_password);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));

function validateSchema(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}
