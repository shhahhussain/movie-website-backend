const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

async function validateRental(rental) {
    const schema = Joi.object({
      customerId: JoiObjectId().required(),
      movieId: JoiObjectId().required(),
    });
  
    try {
      return await schema.validateAsync(rental);
    } catch (error) {
      throw error;
    }
  }
  
exports.Rental = Rental;
exports.validate = validateRental;
