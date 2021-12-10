const Request = require('../../model/request');
const Product = require('../../model/product');

const jwt = require('jsonwebtoken');

exports.fetchPendingRequests = async (req,res) => {

    decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = decodedToken.username;
    let productIds = [];

    await Request.find({senderName: username})
    .then((pendingRequests)=>{
        pendingRequests.forEach(item=> productIds.push(item.productId));

        Product.find({_id: {$in : productIds}})
        .then(products=> {

            res.status(200).json({
                error: {
                    status: "0",
                    code: "0",
                    message: "no error.",
                },
                data: {
                    pendingRequests: pendingRequests,
                    products: products
                }
            })

        })

    })
    .catch((err) => {
        res.status(406).json({
          error: {
            status: "1",
            code: "1",
            message: "Problem in finding pending requests in database",
          },
          data: {},
        });
        return console.error(err);
    });

}