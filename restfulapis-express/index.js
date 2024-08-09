const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello world !!!wx</h1>");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`course with the id ${req.params.id} not found`);
  res.send(course).status(200);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses).status(200);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));

//-----------------------------------------------------
// for multiple params or sorting
// app.get("/api/posts/:year/:month", (req, res) => {
//    res.send(req.params);
//    res.send(req.query);
// });
