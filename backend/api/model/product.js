const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  productName: {
    type: String,
    required: [true, "Product name is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required."],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "User id is required."],
    trim: true,
  },
  categoryId: {
    type: String,
    required: [true, "Category id is required."],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required."],
    trim: true,
  },
  transactionType: {
    type: String,
    required: [true, "Transaction type is required."],
    trim: true,
  },
  images: {
    type: [String],
    required: [true, "Product image is required."],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Date added is required."],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Status is required."],
    trim: true,
  },
  requests: {
    type: [String],
    required: [true, "Status is required."],
    trim: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
