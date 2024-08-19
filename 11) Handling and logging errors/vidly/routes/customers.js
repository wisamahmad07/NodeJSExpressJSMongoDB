const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  if (!customers)
    return res.status(404).send("Error in finding your customers");
  res.send(customers);
});
// let id = "";
// let timestamp = "";
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");
  // id = customer._id;
  // timestamp = id.getTimestamp();
  // console.log("time", timestamp);
  // console.log("id", id.toString());

  res.send(customer);
});
router.post("/", auth, async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.status(201).send({ message: "Customer added sucessfully" });
});
router.put("/:id", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("customer not found and update");
  res.send(201).send({ message: "customer is updated" });
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send(`customer with this id ${req.params.id} not found`);
  res.send(customer);
});

module.exports = router;
