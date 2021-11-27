const Product = require('../../model/product');

exports.fetchProduct = async (req,res) => {
    const productId = req.params.product_id;
    

    await Product.findById(productId)
    .then((product)=>{
        res.status(200).json({
            error: {
                status: "0",
                code: "0",
                message: "no error.",
            },
            data: product
        })
    })
    .catch((err)=>{
        res.status(406).json({
            error: {
              status: "1",
              code: "1",
              message: "Product Unavailable",
            },
            data: {},
        });
        return console.error(err);
    })
}