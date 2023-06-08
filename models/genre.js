const mongoose = require("mongoose");
const joi = require("joi");

const genreSchema=mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 }
});

const Genre = mongoose.model('Genre', genreSchema)
  

function validateGenre(genre) {
    const schema = joi.object({
      name: joi.string().min(3).required()
    });
    return schema.validate(genre);
  }
  
  exports.genreSchema=genreSchema
  exports.Genre=Genre;
  exports.validate=validateGenre
  