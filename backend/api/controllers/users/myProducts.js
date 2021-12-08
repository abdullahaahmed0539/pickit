/*
DOCUMENTATION 
        Error codes:
        1. User not found in DB = 1
        2. Problem in find Query = 2
*/

const Products = require("../../model/product");
const User = require("../../model/user");
const jwt = require('jsonwebtoken');

exports.myProducts = async (req, res) => {
  let username = null;
  decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  await User.findById(req.params.userid)
  .then((user)=>{
    username = user.username;
  })
  
  if(username != decodedToken.username){
    res.status(404).json({
      error: {
        status: "1",
        code: "3",
        message: "Not Your Products",
      },
      data: {
        Products,
      },
    });
    return;
  }

  await Products.find({ username: username })
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
        return;
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
      return;
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
