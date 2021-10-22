const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token,'verysecretprivatekey');
        const usernameRecieved = req.body.username;
        if(usernameRecieved != null){
            if(usernameRecieved != verify.username){
                throw new Error("Access denied");
            }
        }
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            error: {
                status: "1",
                code: "4",
                message: "Unauthorized Access"
            },
            data: {}
        })
    }

}