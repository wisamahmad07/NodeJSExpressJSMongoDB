const mongoose = require("mongoose");
const Joi = require("joi");
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

function validateSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = { Genre, validateSchema };
