const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();

// Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid Customer');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid Movie');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie out of stock');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

//   try {
//     new Fawn.Task()
//       .save('rentals', rental)
//       .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
//       .run();

//     res.send(rental);
//   } catch (ex) {
//     res.status(500).send('Something failed');
//   }
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router;






// const { Rental, validate } = require('../models/rental');
// const { Movie } = require('../models/movies');
// const { Customer } = require('../models/customer');
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   const rentals = await Rental.find().sort('-dateOut');
//   res.send(rentals);
// });

// router.post('/', async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const customer = await Customer.findById(req.body.customerId).session(session);
//     if (!customer) {
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(400).send('Invalid Customer');
//     }

//     const movie = await Movie.findById(req.body.movieId).session(session);
//     if (!movie) {
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(400).send('Invalid Movie');
//     }

//     if (movie.numberInStock === 0) {
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(400).send('Movie out of stock');
//     }

//     let rental = new Rental({
//       customer: {
//         _id: customer._id,
//         name: customer.name,
//         phone: customer.phone,
//       },
//       movie: {
//         _id: movie._id,
//         title: movie.title,
//         dailyRentalRate: movie.dailyRentalRate,
//       },
//     });

//     rental = await rental.save();
//     movie.numberInStock--;
//     await movie.save();

//     await session.commitTransaction();
//     session.endSession();

//     res.send(rental);
//   } catch (ex) {
//     await session.abortTransaction();
//     session.endSession();
//     res.status(500).send('Something failed');
//   }
// });

// router.get('/:id', async (req, res) => {
//   const rental = await Rental.findById(req.params.id);

//   if (!rental)
//     return res.status(404).send('The rental with the given ID was not found.');

//   res.send(rental);
// });

// module.exports = router;
