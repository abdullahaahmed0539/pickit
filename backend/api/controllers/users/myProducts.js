/*
DOCUMENTATION 
        Error codes:
        1. User not found in DB = 1
        2. Problem in find Query = 2
*/

const Products = require("../../model/product");

exports.myProducts = (req, res) => {
  const { username } = req.body;

  Products.find({ username: username })
    .then((Products) => {
      if (Products.length == 0) {
        res.status(404).json({
          error: {
            status: "1",
            code: "1",
            message: "No products listed.",
          },
          data: {
            Products,
          },
        });
      }

      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          Products,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          status: "1",
          code: "2",
          message: "Problem with FindOne query.",
        },
        data: {},
      });
      return console.error(`Error log: \n ${err}`);
    });
};
