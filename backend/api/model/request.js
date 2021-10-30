const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  senderName: String,
  recieverName: String,
  offer: {
    cash: String,
    productId: String
  },
  productId: String,
  status: String,
});

module.exports = mongoose.model("Request", requestSchema);
