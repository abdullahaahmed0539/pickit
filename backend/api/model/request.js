const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  //sender_Id: mongoose.Schema.Types.ObjectId,
  senderName: String,
  recieverName: String,
  offer: {
    cash: String,
    productId: String
  },
  productId: String,
  //reciever_Id: mongoose.Schema.Types.ObjectId,
  status: String,
});

module.exports = mongoose.model("Request", requestSchema);
