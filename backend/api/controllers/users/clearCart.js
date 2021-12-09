const User = require('../../model/user')
const jwt = require("jsonwebtoken");

exports.clearCart = async (req,res) => {
    const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
     updateAttributes = {
       cart: []
     };
    User.updateOne({ _id: decodedToken._id }, updateAttributes)
      .catch(err => console.log(err));
}