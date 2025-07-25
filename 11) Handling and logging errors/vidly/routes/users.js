const { User, validate } = require("../models/user");
const autherizationOrPermission = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  if (!users) return res.status(404).send("Error in finding users");
  res.send(users);
});
router.get("/me", autherizationOrPermission, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).send("user not found");

  res.send(user);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User({
      isAdmin: req.body.isAdmin,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).header("x-auth-token", token).send({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
