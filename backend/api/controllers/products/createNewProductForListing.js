/*
DOCUMENTATION
Status values: 0 -> closed
               1 -> active 
               2 -> pending
transactionType values: 0 -> sell
                        1 -> exchange
               
error types:
     0 -> missing attributes which are required.

*/


const Product = require("../../model/product");

exports.createNewProductForListing = (req, res) => {
  const { productName, categoryId, ownerId, description, price, date, transactionType, images } =
    req.body;

  var newProduct = new Product({
    productName,
    categoryId,
    ownerId,
    description,
    price,
    date,
    transactionType,
    images,
    status:  2,
  });

  newProduct.save((err, Product) => {
      if (err){
          //error handling
          return console.error(err);
      }

      res.status(201).json({
        error: {
          status: '0',
          code: '0',
          message: 'no error.',
        },
        data: {
          productName: Product.Productname,
          owner_id: Product.ownerId,
          category_id: Product.categoryId,
          description: Product.description,
          transaction_type: Product.transactionType,
          price: Product.price,
          date: Product.date,
          images: Product.images,
          status: Product.status
        },
      });


  });
};
