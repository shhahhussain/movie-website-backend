// const boolean = require('joi/lib/types/boolean');
// const Joi = require('joi');
// const config = require('config');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const joi = require('joi');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});


const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = joi.object({
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    });
    
    return schema.validate(user);
}


exports.User = User;
exports.validate = validateUser;

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.SECRET_KEY);
//     return token;
// }