const Product = require('../../model/product');
const jwt = require('jsonwebtoken');
const Request = require("../../model/request");

exports.deleteProduct = async (req,res) => {

    decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const productId = req.params.product_id;
    let productOwner = null;

    await Product.findById(productId)
    .then((product)=>{
        productOwner = product.username;
    })

    if(productOwner != decodedToken.username){
        res.status(404).json({
        error: {
            status: "1",
            code: "3",
            message: "Not Your Product to delete",
        },
        data: {},
        });
        return;
    }

    await Product.deleteOne({_id : productId})
    .then((result)=>{
        res.status(200).json({
            error: {
                status: "0",
                code: "0",
                message: "no error.",
            },
            data: {result},
        })
    })
    .catch((err) => {
        res.status(500).json({
          error: {
            status: "1",
            code: "4",
            message: "Problem deleting the product",
          },
          data: {},
        });
        return console.error(`Error log: \n ${err}`);
    });

    Request.deleteMany({productId : productId})
    .then()
    .catch((err) => {
        res.status(500).json({
          error: {
            status: "1",
            code: "5",
            message: "Problem deleting the requests associated with the product",
          },
          data: {},
        });
        return console.error(`Error log: \n ${err}`);
    });


}