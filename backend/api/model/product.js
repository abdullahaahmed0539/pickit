const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    productName : String,
    description : String,
    user_Id : mongoose.Schema.Types.ObjectId,
    category_Id : mongoose.Schema.Types.ObjectId,
    price : Number,
    status : String,
    image: String
})

module.exports = mongoose.model('Product',productSchema);