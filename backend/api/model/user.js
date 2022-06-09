const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is required."],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Email is required."],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: [true, "Password is required."],
    trim: true,
  },
  phone: {
    type: String,
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
  cart: {
    type: [String],
    trim: true,
  },
  userType: String,
  categoryId: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
