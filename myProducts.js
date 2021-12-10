/*
DOCUMENTATION 
        Error codes:
        1. User not found in DB = 1
        2. Problem in find Query = 2
*/

const Products = require("../../model/product");
const User = require("../../model/user");
const jwt = require('jsonwebtoken');



exports.myProducts = async (req, res) => {
  // const { username } = req.body;
  let username = null;
  let pageId = 1;
  let productFilter ="all";
  const limit = 4 ;
  // const pageId = req.params.pageId;

  //Setting the pageId
  if(req.body.pageId && req.body.pageId !=="" && req.body.pageId > 0){
    pageId = req.body.pageId;
  }

  //Setting product filter
  if(req.body.productFilter && req.body.productFilter !=="all" && req.body.productFilter !==""){
    productFilter = req.body.productFilter;
  }

  // const limit = 3;
  let numOfProducts = 0;

  decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);

  await User.findById(req.params.userid)
  .then((user)=>{
    username = user.username;
  })

  if(username != decodedToken.username){
    res.status(404).json({
      error: {
        status: "1",
        code: "3",
        message: "Not Your Products",
      },
      data: {
        Products,
      },
    });
    return;
  }

  //to return the total number of products in this section : for pagination at front end too
  await Products.find({username: username})
  .then((Products)=>{
    numOfProducts = Products.length;
  })

  // await Products.find({ username: username }).limit(limit).skip((pageId-1)*limit)
    await Products.find({ username: username })
    .then((products) => {
     let returnProducts = [...products];
     let paginatedProducts = null;
     
     if(productFilter !== "all"){
       returnProducts = returnProducts.filter(item=> item.status === productFilter);
     }

     if(Math.ceil(returnProducts.length/limit) >= pageId){
      // returnProducts = returnProducts.slice((pageId-1)*limit,limit);
      paginatedProducts = returnProducts.slice((pageId-1)*limit,((pageId-1)*limit) + limit);
     }
     else{
      paginatedProducts = returnProducts.slice(0,limit);
     }


      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          paginatedProducts,
          totalProducts: returnProducts.length
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          status: "1",
          code: "2",
          message: "Problem with FindOne query.",
        },
        data: {},
      });
      return console.error(`Error log: \n ${err}`);
    });
};
