const Product = require('../../model/product');
const jwt = require('jsonwebtoken');
const User = require("../../model/user");

exports.removeFromCart = async (req,res) => {

    decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = decodedToken.username;
    const productId = req.params.product_id;

    await User.findOneAndUpdate(
        {username: username},
        {$pull: {cart: productId }})
        .then((user) => {
    
        res.status(200).json({
            error: {
                status: "0",
                code: "0",
                message: "no error.",
            },
            data: {
                confirmation: true,
                userDetails: user
            }
        })

    })
    .catch((err)=>{
        res.status(500).json({
            error: {
                status: "1",
                code: "1",
                message: "Unable to Remove the product from card",
            },
            data: {},
        });
    })


}