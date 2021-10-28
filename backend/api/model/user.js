const mongoose = require("mongoose");

//make require -> after merging to master

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  userType: String,
  categoryId: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
