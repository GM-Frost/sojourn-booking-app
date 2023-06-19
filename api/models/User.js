const mongoose = require('mongoose');
const {Schema} = mongoose;

//defining schema

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
});


//creating user model

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;