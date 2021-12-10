const Request = require("../../model/request");
const Product = require("../../model/product");
const mongoose = require("mongoose");
const request = require("../../model/request");

exports.removeRequest = async (req, res) => {
  let productId = "";

  const requestId = req.params.request_id;

  await Request.findById(requestId)
    .then(request => {
      productId = request.productId;
    })
    .catch(err => {});

  if (productId === "") {
    console.log("Wrong product ID !");
  }

  await Product.findOneAndUpdate(
    { _id: productId },
    { $pull: { requests: requestId } }
  )
    .then()
    .catch(err => console.log(err));

  await Request.deleteMany({ _id: requestId })
    .then(removed => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error",
        },
        data: {
          requestsRemovedSuccessfully: true,
        },
      });
    })
    .catch(err => {
      res.status(500).json({
        error: {
          status: "1",
          code: "1",
          message: "Couldn't remove requests from db",
        },
        data: {
          requestsRemovedSuccessfully: false,
        },
      });
    });
};
