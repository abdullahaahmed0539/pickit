const Request = require('../../model/request');
const Product = require('../../model/product');
const jwt = require('jsonwebtoken');

exports.performAction = async (req,res) => {
    const action = req.body.action;
    const requestId = req.params.request_id;
    let isOwner = true;
    let senderName = null;
    let productId = null;

    let isRequestAvailable = true;
    
    //Checking if the user sending this request is the owner of this product
    decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

    await Request.findById(requestId)
    .then((request)=>{
        if(request.status != "pending"){
            isRequestAvailable = false;
            throw new Error("Request removed");
        }
        
        //If sender of request is not the owner of this product, do not go further
        if(request.recieverName != decodedToken.username){
            isOwner = false;
            throw new Error("Not your products to make decision");
        }
        productId = request.productId;
        senderName = request.senderName;
        
        Request.findByIdAndUpdate(requestId,{$set: {status: action+"ed"}})
        .then()
        .catch((err)=>{
            res.status(500).json({
                error: {
                    status: "1",
                    code: "1",
                    message: "Cannot perform action on request"
                },
                data: {actionSuccssful : "false"}
            })
        })
    })
    .catch((err)=>{
        isRequestAvailable = false;
        return res.status(500).json({
            error: {
                status: "1",
                code: "2",
                message: err.message
            },
            data: {actionSuccssful : "false"}
        });
    })

    //Do not make further api calls if the request is not available
    if(!isRequestAvailable || !isOwner){
        return;
    }


    if(action==="accept"){
        await

        await Product.findByIdAndUpdate(productId,{$set: {status: "sold"}})
        .then((product)=>{
            res.status(200).json({
                error: {
                    status: "0",
                    code: "0",
                    message: "no error.",
                },
                data: {actionSuccssful : "true"}
            })
        })
        .catch((err)=>{
            return res.status(500).json({
                error: {
                    status: "1",
                    code: "3",
                    message: "Cannot update product in db"
                },
                data: {actionSuccssful : "false"}
            });
        })
        
    }

    if(action === "reject"){
        Product.findByIdAndUpdate(productId,{$pull: {requests: requestId}})
        .then((product)=>{
            res.status(200).json({
                error: {
                    status: "0",
                    code: "0",
                    message: "no error.",
                },
                data: {actionSuccssful : "true"}
            })
        })
        .catch((err)=>{
            return res.status(500).json({
                error: {
                    status: "1",
                    code: "3",
                    message: "Cannot update product in db"
                },
                data: {actionSuccssful : "false"}
            });
        })
    }

    
}