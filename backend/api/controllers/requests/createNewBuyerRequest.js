const Request = require('../../model/request');
const Product = require('../../model/product');
const mongoose = require('mongoose');
const request = require('../../model/request');

exports.createNewBuyerRequest = async (req,res) => {
    const {
        productId,
        senderName,
        recieverName,
        offer
    } = req.body;

    await Product.findById(productId)
    .then((product)=>{
        console.log(product);
        if(product.status != "active")
        {
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
        return console.error(err);
    })

    console.log("this should not have run");

    // const newRequest = new Request({
    //     productId,
    //     senderName,
    //     recieverName,
    //     offer: {
    //         cash: offer.cash,
    //         productId: offer.productId
    //     },
    //     status: "pending"
    // });

    // newRequest.save()
    // .then((request)=>{
    //     res.status(200).json({
    //         error: {
    //             status: "0",
    //             code: "0",
    //             message: "No Error"
    //         },
    //         data: {
    //             request_generation_confirmation: "true"
    //         }
    //     });
    //     return console.error(err);
    // })
    // .catch((err)=>{
    //     res.status(500).json({
    //         error: {
    //             status: "1",
    //             code: "3",
    //             message: "Unable to save the request"
    //         },
    //         data: { request_generation_confirmation: "false"}
    //     });
    //     return console.error(err);
    // })

    // Product.findOneAndUpdate(
    //     {_id: productId},
    //     {$push: {requests: senderName }}
    // )
    // .catch((err)=>{
    //     res.status(500).json({
    //         error: {
    //             status: "1",
    //             code: "1",
    //             message: "Invalid Data"
    //         },
    //         data: { request_generation_confirmation: "false"}
    //     });
    //     return console.error(err);
    // })
}