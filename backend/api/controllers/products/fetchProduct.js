const Product = require("../../model/product");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const Request = require("../../model/request");

exports.fetchProduct = async (req, res) => {
  decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  if (decodedToken === null) {
    // User not logged in

    await Product.findById(req.params.product_id)
      .then(product => {
        res.status(200).json({
          error: {
            status: "0",
            code: "0",
            message: "no error.",
          },
          data: {
            product,
            inCart: false,
            sentRequest: false,
            recievedRequest: false,
          },
        });
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
  } else {
    const username = decodedToken.username;
    const productId = req.params.product_id;

    let inCart = false;
    let sentRequest = false;
    let recievedRequest = false;
    let soldTo = "";

    await User.findOne({ _id: decodedToken._id }).then(user => {
      //Check to see if the product is present in user's cart
      if (user.cart.indexOf(productId) !== -1) {
        inCart = true;
      }
    });

    await Request.find({
      productId,
      recieverName: username,
      status: "accepted",
    }).then(requests => {
      if (requests.length > 0) {
        soldTo = requests[0].senderName;
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

    await Request.find({ recieverName: username, status: "pending" })
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
            soldTo
          },
        });
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
  }
};