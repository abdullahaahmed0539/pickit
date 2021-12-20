const Request = require("../../model/request");
const Product = require("../../model/product");
const jwt = require("jsonwebtoken");

exports.fetchProductRequests = async (req, res) => {
  const productId = req.params.product_id;
  let isOwner = true;
  let productPresent = true;

  //Checking if the user sending this request is the owner of this product
  decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

  await Product.findById(productId)
    .then(product => {
      if (product.username != decodedToken.username) {
        isOwner = false;
        throw new Error("Not your product to see its requests!");
      }
    })
    .catch(err => {
      productPresent = false;
      msg = "Product not availablle";
      if (err.message === "Not your product to see its requests!") {
        msg = err.message;
      }
      return res.status(500).json({
        error: {
          status: "1",
          code: "1",
          message: msg,
        },
        data: {},
      });
    });
  if (!isOwner || !productPresent) {
    return;
  }

  await Request.find({
    productId: productId,
    status: { $in: ["pending", "accepted"] },
  })
    .then(requestsOfThisProduct => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: { requestsOfThisProduct },
      });
    })
    .catch(err => {
      res.status(406).json({
        error: {
          status: "1",
          code: "1",
          message:
            "Problem in finding requests related to this product in database",
        },
        data: {},
      });
      return console.error(err);
    });
};
