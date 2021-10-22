/*
DOCUMENTATION       
error types:
     0 -> missing attributes which are required.
*/

const Product = require("../../model/product");

exports.createNewProductForListing = (req, res) => {
  const {
    productName,
    categoryId,
    username,
    description,
    price,
    date,
    transactionType,
    images,
  } = req.body;

  var newProduct = new Product({
    productName,
    categoryId,
    username,
    description,
    price,
    date,
    transactionType,
    images,
    status: "pending",
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          productName: product.Productname,
          category_id: product.categoryId,
          description: product.description,
          transaction_type: product.transactionType,
          price: product.price,
          date: product.date,
          images: product.images,
          status: product.status,
        },
      });
    })
    .catch((err) => {
      res.status(406).json({
        error: {
          status: "1",
          code: "0",
          message: "Missing values.",
        },
        data: {},
      });
      return console.error(err);
    });
};
