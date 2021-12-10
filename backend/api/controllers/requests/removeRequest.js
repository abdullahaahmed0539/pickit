const Request = require('../../model/request');
const Product = require('../../model/product');
const mongoose = require('mongoose');
const request = require('../../model/request');

exports.removeRequest = async (req,res) => {
    // const {
    //     productId,
    //     senderName,
    //     recieverName,
    //     offer
    // } = req.body;


    // let isProductAvailable = true;
    // let requestId = null;
    let productId="";

    const requestId = req.params.request_id;

    await Request.findById(requestId)
    .then((request)=>{
        // console.log(product);
        productId = request.productId;
        // Product.findOneAndUpdate({_id: productId},{$pull: {requests: requestId}})
    })
    .catch((err)=>{
        // return res.status(500).json({
        //     error: {
        //         status: "1",
        //         code: "2",
        //         message: "Product not available"
        //     },
        //     data: { request_generation_confirmation: "false"}
        // });
        // return console.error(err);
    })

    if(productId===""){
        console.log("Wrong product ID !");
    }

    await Product.findOneAndUpdate({_id: productId},{$pull: {requests: requestId}})
    .then()
    .catch(err=>console.log(err))

    await Request.deleteMany({_id: requestId})
    .then(removed => {
        res.status(200).json({
            error: {
                status: "0",
                code: "0",
                message: "no error"
            },
            data: {
                requestsRemovedSuccessfully : true
            }
        })
    })
    .catch(err=> {
        res.status(500).json({
            error: {
                status: "1",
                code: "1",
                message: "Couldn't remove requests from db"
            },
            data: {
                requestsRemovedSuccessfully : false
            }
        })
    })



    

    
}