const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Username is required."],
        unique: true,
        trim: true,
      },
    email : {
        type: String,
        require: [true, "Email is required."],
        unique: true,
        trim: true,
      },
    phone : {
        type: Number,
        unique: true,
        trim: true,
      },
    password : {
        type: String,
        require: [true, "Password is required."],
        trim: true,
      },
    userType : String
})


const User = mongoose.model('User',userSchema);

module.exports = User;
