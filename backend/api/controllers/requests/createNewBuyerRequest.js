const Request = require('../../model/request');
const Product = require('../../model/product');

exports.createNewBuyerRequest = async (req,res) => {
    const {
        productId,
        senderName,
        recieverName,
        offer
    } = req.body;


    let isProductAvailable = true;
    let requestId = null;

    await Product.findById(productId)
    .then((product)=>{
        if(product.status != "active")
        {
            isProductAvailable = false;
            throw new Error("Product unavailable");
        }
    })
    .catch((err)=>{
        return res.status(500).json({
            error: {
                status: "1",
                code: "2",
                message: "Product not available"
            },
            data: { request_generation_confirmation: "false"}
        });
    })
    if(!isProductAvailable){
        return;
    }


    const newRequest = new Request({
        productId,
        senderName,
        recieverName,
        offer: {
            cash: offer.cash,
            productId: offer.productId
        },
        status: "pending"
    });
    
    await newRequest.save()
    .then((request)=>{
        requestId = request._id;
        res.status(200).json({
            error: {
                status: "0",
                code: "0",
                message: "No Error"
            },
            data: {
                request_generation_confirmation: "true"
            }
        });
    })
    .catch((err)=>{
        res.status(500).json({
            error: {
                status: "1",
                code: "3",
                message: "Unable to save the request"
            },
            data: { request_generation_confirmation: "false"}
        });
        return console.error(err);
    })


    await Product.findOneAndUpdate(
        {_id: productId},
        {$push: {requests: requestId }}
    )
    .catch((err)=>{
        res.status(500).json({
            error: {
                status: "1",
                code: "1",
                message: "Invalid Data"
            },
            data: { request_generation_confirmation: "false"}
        });
        return console.error(err);
    })
}