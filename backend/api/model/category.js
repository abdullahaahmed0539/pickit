const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {type:String,required: [true, 'A category must have a name.']},
  image: {type:String, required: [true, 'A category must have a image.']},
});

module.exports = mongoose.model("Category", categorySchema);
