// const express=require("express")
// const joi = require("joi")
// const mongoose = require("mongoose")

// const { genreSchema } = require("./genre")

// const moviesSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 5,
//         maxlength: 255
//     },
//     // alif: {
//     //     type: genreSchema,
//     //     required:true
//     // },
//     numberInStock: {
//         type: Number,
//         required: true,
//         min: 0,
//     },
//     dailyRentalRate: {
//         type: Number,
//         required: true,
//         min: 0,
//     }
// })

// const Movie = mongoose.model("Movies", moviesSchema)

// // function validateMovie(movie) {
// //     const schema = joi.object({
// //         title: joi.string().min(1).max(255).required(),
// //         // alif: joi.required(),
// //         // numberInStock: joi.number().min(0).required(),
// //         // dailyRentalRate: joi.number().min(0).required()
// //     })
// //     return schema.validate(movie)
// // }

// // exports.validate=validateMovie;
// exports.Movie=Movie;


const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
        title:{
            type: String,
            required: true,
            trim: true,
            minlength:5,
            maxlength:225
        },
        genre:{
            type: genreSchema,
            required: true
        },
        numberInStock: { 
            type: Number, 
            required: true,
            min: 0,
            max: 255
          },
          dailyRentalRate: { 
            type: Number, 
            required: true,
            min: 0,
            max: 255
          }
}));

function validateMovie(movie){
    const schema={
        title: Joi.string().min(5).max(225).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
return Joi.validate(movie,schema);
}

exports.Movie = Movie;
exports.validate=validateMovie;