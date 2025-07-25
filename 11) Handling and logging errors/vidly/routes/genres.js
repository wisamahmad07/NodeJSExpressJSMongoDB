const { Genre, validateGenre } = require("../models/genre");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

/* router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  })
); */
router.get("/", async (req, res) => {
  // throw new Error("could not find genres");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  res.status(200).send(genre);
});

router.post("/", auth, async (req, res) => {
  console.log(req.body);

  const { error, value } = validateGenre(req.body);
  console.log(error);
  console.log(value);

  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name, abc: req.body.abc });
  genre = await genre.save();
  res.status(201).send({ message: `${genre.name} successfully added`, genre });
});

router.put("/:id", async (req, res) => {
  const { error, value } = validateGenre(req.body);
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

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  res.send(`deleted successfully ${genre.name}`);
});

module.exports = router;
