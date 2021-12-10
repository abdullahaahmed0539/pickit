const Product = require('../../model/product');
const jwt = require('jsonwebtoken');
const User = require("../../model/user");

exports.addToCart = async (req,res) => {

    decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = decodedToken.username;
    const productId = req.params.product_id;
    let isInCart = false;

    let productAvailable = true;

    await User.findOne({ username }).select('cart')
        .then(response => {
            response.cart.forEach(item => {
                if (item === productId) {
                    isInCart = true
                    
            } })
        })
    
    console.log(isInCart)

    if (isInCart) {
        res.status(200).json({
          error: {
            status: "0",
            code: "0",
            message: "no error.",
          },
          data: {
            confirmation: true,
           
          },
        });
        return;
    }
    await Product.find({_id: productId}).then((item)=> {
        if(item.status ==="sold"){

            res.status(500).json({
                error:{
                    status: "1",
                    code: "1",
                    message: "Product has been sold"
                },
                data:{
                    confirmation: false
                }
            })
            productAvailable = false;
        }
    })
    .catch((err)=>{

        productAvailable = false;
        res.status(500).json({
            error: {
                status: "1",
                code: "2",
                message: "Product Not Found",
            },
            data: {
                confirmation: false
            },
        });
    })

    if(!productAvailable){
        return;
    }

    await User.findOneAndUpdate(
        {username: username},
        {$push: {cart: productId }})
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
                code: "3",
                message: "Unable to Add the product to card",
            },
            data: {},
        });
    })


}