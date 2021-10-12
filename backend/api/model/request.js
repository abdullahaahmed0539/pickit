const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    sender_Id : mongoose.Schema.Types.ObjectId,
    product_Id : mongoose.Schema.Types.ObjectId,
    reciever_Id : mongoose.Schema.Types.ObjectId,
    status : String
})

module.exports = mongoose.model('Request',requestSchema);