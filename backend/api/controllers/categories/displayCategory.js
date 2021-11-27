/*
DOCUMENTATION 
        Error codes:
        1. Problem in find Query = 1
*/





const CategoryProducts = require("../../model/product");
exports.displayCategory = async (req, res) => {
  // const categoryId = `ObjectId('${req.params.category_id}')`;
  const categoryId = req.params.category_id;
  const pageId = req.params.pageId;
  const limit = 3;
  let numOfProducts = 0;

  //to return the total number of products in this section : for pagination at front end too
  await CategoryProducts.find({ categoryId: categoryId, status: "active" })
  .then((Products)=>{
    numOfProducts = Products.length;
  })

  await CategoryProducts.find({ categoryId: categoryId, status: "active" }).limit(limit).skip((pageId-1)*limit)
    .then((categoryProducts) => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          categoryProducts,
          totalProducts: numOfProducts
        },
      });
    })
    .catch((err) => {
        res.status(500).json({
            error: {
              status: "1",
              code: "1",
              message: "Problem with FindOne query.",
            },
            data: {},
          });
          return console.error(`Error log: \n ${err}`);
    });
};
