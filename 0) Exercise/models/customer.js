const mongoose = require("mongoose");
const Joi = require("joi");
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

exports.Customer = Customer;
exports.validate = validateSchema;
