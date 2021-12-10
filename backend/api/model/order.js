const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is required."],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "email  is required."],
    trim: true,
  },
  phone: {
    type: String,
    require: [true, "phone  is required."],
    trim: true,
  },
  address: {
    type: String,
    require: [true, "address  is required."],
    trim: true,
  },
  total: {
    type: Number,
    require: [true, "total is required."],
    trim: true,
  },
  date: {
    type: Date,
    require: [true, "Date added is required."],
    trim: true,
  },
  status: {
    type: String,
    require: [true, "Status is required."],
    trim: true,
  },
  order: {
    type: [Object],
    require: [true, "order is required."],
    trim: true,
  },
  verificationCode: {
    type: String,
    require: [true, "pin is required."],
    trim: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
