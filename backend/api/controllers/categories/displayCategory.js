/*
DOCUMENTATION 
        Error codes:
        1. Problem in find Query = 1
*/





const CategoryProducts = require("../../model/product");
exports.displayCategory = (req, res) => {
  const categoryId = `ObjectId('${req.params.category_id}')`;

  CategoryProducts.find({ categoryId: categoryId, status: /active/ })
    .then((categoryProducts) => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          categoryProducts,
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
