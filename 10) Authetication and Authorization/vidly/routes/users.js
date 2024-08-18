const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  if (!users) return res.status(404).send("Error in finding users");
  res.send(users);
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("user not found");

  res.send(user);
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) res.status(400).send("User already registered");

  try {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user = await user.save();
    res.status(201).send({ message: "User added sucessfully" });
  } catch (error) {
    res.status(400).send("bad request");
  }
});

module.exports = router;
