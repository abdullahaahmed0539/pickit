const Product = require("../../model/product");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");

exports.fetchCartProducts = async (req, res) => {
  decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  const username = decodedToken.username;
  let userCart = [];

  await User.find({ username: username }).then(users => {
    userCart = users[0].cart;
  });

  await Product.find({ _id: { $in: userCart } })
    .then(items => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "No error",
        },
        data: {
          cartProducts: items,
        },
      });
    })
    .catch(err => {
      res.status(500).json({
        error: {
          status: "1",
          code: "1",
          message: "Products Not Found",
        },
        data: {},
      });
    });
};
