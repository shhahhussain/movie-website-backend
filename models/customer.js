const mongoose = require("mongoose");
const joi = require("joi");

const customerSchema= mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

const Customer = mongoose.model("Customer",customerSchema);

  function validateCustomer(customer) {
    const schema = joi.object({
      name: joi.string().min(5).max(50).required(),
      phone: joi.string().min(5).max(50).required(),
      isGold: joi.boolean()
    });
  
    return schema.validate(customer);
  }
  

  exports.Customer = Customer;
  exports.validate = validateCustomer;