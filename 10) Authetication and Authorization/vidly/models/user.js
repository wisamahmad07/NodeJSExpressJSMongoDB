// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey
  );
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(5).max(50).email(),
    password: Joi.string().required().min(8).max(50),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
