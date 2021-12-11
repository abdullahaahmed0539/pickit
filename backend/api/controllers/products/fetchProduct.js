const Product = require("../../model/product");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const Request = require("../../model/request");

exports.fetchProduct = async (req, res) => {
  decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  const productId = req.params.product_id;

  let inCart = false;
  let sentRequest = false;
  let recievedRequest = false;

  
  await Product.findById(productId)
    .then(product => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          product,
          inCart,
          sentRequest,
          recievedRequest,
        },
      });
      return  
    })
    .catch(err => {
      res.status(406).json({
        error: {
          status: "1",
          code: "1",
          message: "Product Unavailable",
        },
        data: {},
      });
      return console.error(err);
    });

  
    const username = decodedToken.username;

  await User.findOne({ _id: decodedToken._id }).then(user => {
    //Check to see if the product is present in user's cart
    if (user.cart.indexOf(productId) !== -1) {
      inCart = true;
    }
  });

  await Request.find({
    productId: productId,
    senderName: username,
    status: "pending",
  })
    .then(requests => {
      if (requests.length > 0) {
        sentRequest = true;
      }
    })
    .catch();

  await Request.find({ recieverName: username })
    .then(requests => {
      if (requests.length > 0) {
        requests.map(request => {
          if (request.offer.productId === productId) {
            recievedRequest = true;
          }
        });
      }
    })
    .catch();

};
