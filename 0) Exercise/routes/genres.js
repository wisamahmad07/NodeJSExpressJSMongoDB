const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Fight" },
  { id: 3, name: "Investigate" },
];

router.get("/", (req, res) => {
  res.send(genres);
});
router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  res.status(200).send(genre);
});

router.post("/", (req, res) => {
  const { error, value } = validateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.status(201).send({ message: `${genre.name} successfully added`, genre });
});

router.put("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  const { error, value } = validateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.status(201).send({ message: `${genre.name} successfully added`, genre });
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(`deleted successfully ${genre}`);
});

function validateSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
