const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`course with the id ${req.params.id} not found`);
  res.send(course).status(200);
});

router.post("/", (req, res) => {
  const { error, value } = validateSchema(req.body);
  if (error) return res.send(error.details[0].message).status(400);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses).status(200);
});

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`course with the id ${req.params.id} not found`);
  const { error, value } = validateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.status(201).send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`course with the id ${req.params.id} not found`);
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
