const auth = require("../middleware/auth");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(token);
  } catch (error) {
    res.status(500).send(error);
  }
});
function validate(auth) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(50).email(),
    password: Joi.string().required().min(8).max(50),
  });
  return schema.validate(auth);
}
module.exports = router;
