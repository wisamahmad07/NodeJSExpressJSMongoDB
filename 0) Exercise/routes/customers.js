const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length === 11;
      },
      message: "Phone Number must be 11 digits",
    },
    required: [true, "Enter phone number"],
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  if (!customers)
    return res.status(404).send("Error in finding your customers");
  res.send(customers);
});
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");
  res.send(customer);
});
router.post("/", async (req, res) => {
  const { error, value } = validateSchema(req.body);
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
  const { error, value } = validateSchema(req.body);
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
router.delete("/:id", (req, res) => {
  const customer = Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send(`customer with this id ${req.params.id} not found`);
  res.send(customer);
});

function validateSchema(customer) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .required()
      .pattern(/^\d{11}$/),
  });
  return schema.validate(customer);
}
module.exports = router;
