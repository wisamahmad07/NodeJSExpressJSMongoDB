const { Genre, validateSchema } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res
        .status(404)
        .send(`genre with this id ${req.params.id} not found`);
    res.status(200).send(genre);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { error, value } = validateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.status(201).send({ message: `${genre.name} successfully added`, genre });
});

router.put("/:id", async (req, res) => {
  const { error, value } = validateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);

  res.status(201).send({ message: `${genre.name} successfully added`, genre });
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  res.send(`deleted successfully ${genre.name}`);
});

module.exports = router;
