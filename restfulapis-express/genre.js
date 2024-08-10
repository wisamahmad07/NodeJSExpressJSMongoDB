const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Fight" },
  { id: 3, name: "Investigate" },
];

app.get("$", (req, res) => {
  res.send("hello world");
});
app.get("/api/genres/", (req, res) => {
  res.send(genres);
});
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  res.send(genre).status(200);
});

app.post("/api/genres", (req, res) => {
  const { error, value } = validateSchema(req.body);
  if (error) return res.send(error.details[0].message).status(400);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.status(200).send(`${genre} successfully added`);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  const { error, value } = validateSchema(req.body);
  if (error) return res.send(error.details[0].message).status(400);

  genre.name = req.body.name;
  res.status(201).send(`successfully updated ${genre}`);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`genre with this id ${req.params.id} not found`);
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(`deleted successfully ${genre}`);
});

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`start listening on port ${port}...`));

function validateSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required,
  });
  return schema.validate(genre);
}
