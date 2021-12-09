const Product = require("../../model/product");

exports.sellProduct = async (req, res) => {
  const { _id } = req.body;

  Product.updateOne({ _id }, { status: "sold" }).catch(err => console.log(err));
};
