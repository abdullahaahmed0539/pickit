const Product = require("../../model/product");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");

exports.fetchUnapprovedProducts = async (req, res) => {
  decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

  if (decodedToken.userType != "moderator") {
    return res.status(401).json({
      error: {
        status: "1",
        code: "4",
        message: "Unauthorized Access - Not a Moderator",
      },
      data: {},
    });
  }
  let moderatorCategoryId = null;
  await User.find({ _id: decodedToken._id })
    .then(user => {
      moderatorCategoryId = user[0].categoryId;
    })
    .catch(err => {
      res.status(500).json({
        error: {
          status: "1",
          code: "1",
          message: "Moderator data not found",
        },
        data: {},
      });
    });
  Product.find({ status: "pending", categoryId: moderatorCategoryId })
    .then(unapprovedProducts => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: unapprovedProducts,
      });
    })
    .catch(err => {
      res.status(406).json({
        error: {
          status: "1",
          code: "1",
          message: "Problem in finding unapproved products in database",
        },
        data: {},
      });
      return console.error(err);
    });
};
