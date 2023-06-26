const express = require("express");
const error = require("../middleware/error");
const genres = require('../routes/genre');
const customer = require('../routes/customer');
const movie = require('../routes/movies');
const rental = require('../routes/rental');
const users = require('../routes/user');
const auth = require('../routes/auth');

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/genres", genres);
  app.use("/api/customers", customer);
  app.use("/api/movies", movie);
  app.use("/api/rental", rental);
  app.use("/api/user", users);
  app.use("/api/auth", auth);
  app.use(error);
};
