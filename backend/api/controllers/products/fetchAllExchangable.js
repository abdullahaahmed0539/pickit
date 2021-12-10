const Products = require('../../model/product')
const jwt = require("jsonwebtoken");

exports.fetchAllExchangable = async (req, res) => {
    const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const username = decodedToken.username

    try {
        const products = await Products.find({username, transactionType: 'exchange', status: 'active' })
        res.status(200).json({
          error: {
            status: "0",
            code: "0",
            message: "",
          },
          data: products,
        });

    } catch (err) {
         res.status(500).json({
           error: {
             status: "1",
             code: "1",
             message: "Error while fetching data.",
           },
           data: {},
         });
    }
}