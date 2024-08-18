const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
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

function validateCustomers(customer) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    isGold: Joi.boolean(),
    phone: Joi.string().max(11).min(11).required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomers;
