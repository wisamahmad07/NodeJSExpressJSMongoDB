const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

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

function validateSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
