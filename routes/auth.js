const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt= require("jsonwebtoken")
const config =require("config")

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token= user.generateAuthToken()
  res.send(token);
});

function validate(req) {
  const schema = joi.object({
    email: joi.string().email().required().min(5).max(255),
    password: joi.string().required().min(5).max(255)
  });
  return schema.validate(req);
}

module.exports = router;
