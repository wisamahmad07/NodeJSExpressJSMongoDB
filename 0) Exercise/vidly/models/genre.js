const mongoose = require("mongoose");
const Joi = require("joi");
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  abc: {
    type: String,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    abc: Joi.string(),
  });
  return schema.validate(genre);
}

module.exports = { genreSchema, Genre, validateSchema };
