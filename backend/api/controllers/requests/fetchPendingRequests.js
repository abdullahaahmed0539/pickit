const Request = require('../../model/request');
const jwt = require('jsonwebtoken');

exports.fetchPendingRequests = async (req,res) => {

    decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = decodedToken.username;

    await Request.find({status: "pending",senderName: username})
    .then((pendingRequests)=>{
        res.status(200).json({
            error: {
                status: "0",
                code: "0",
                message: "no error.",
            },
            data: pendingRequests
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