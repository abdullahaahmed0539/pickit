const Product = require('../../model/product');
const jwt = require("jsonwebtoken");

exports.updateProduct = async (req,res) => {

    decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const {
        _id,
        productName,
        categoryId,
        username,
        description,
        price,
        date,
        transactionType,
        images,
    } = req.body;

    if(decodedToken.username != username && decodedToken.userType!== 'moderator'){
        return res.status(401).json({
            error: {
              status: "1",
              code: "4",
              message: "Unauthorized Access",
            },
            data: {},
        });
    }

    modifiedProductValues = {
        productName: productName,
        categoryId: categoryId,
        description: description,
        price: price,
        date: date,
        transactionType: transactionType,
        images: images,
        status: transactionType === 'sell' ? "active" : "pending"
    }

    Product.updateOne({_id: _id},modifiedProductValues)
    .then((updatedProduct)=>{
        res.status(200).json({
            error: {
                status: "0",
                code: "0",
                message: "no error.",
            },
            data: updatedProduct
        })
    })
    .catch((err) => {
        res.status(406).json({
        error: {
            status: "1",
            code: "1",
            message: "Problem in updating the product in database",
        },
        data: {},
        });
        return console.error(err);
    });


}