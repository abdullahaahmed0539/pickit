const mongoose = require('mongoose');

//make require -> after merging to master

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
    password : {
          type: String,
          require: [true, "Password is required."],
          trim: true,
        },
    phone : {
        type: String,
        unique: true,
        trim: true,
      },
    address : {
        type: String,
        trim: true,
    },
    image : {
      type: String,
      trim: true,
    },
    userType : String
})


const User = mongoose.model('User',userSchema);

module.exports = User;
