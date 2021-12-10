/*
DOCUMENTATION 
        Error codes:
        1. Problem in find Query = 1
*/

const Categories = require("../../model/category");

exports.displayCategories = (req, res) => {
  Categories.find()
    .then(categories => {
      res.status(200).json({
        error: {
          status: "0",
          code: "0",
          message: "no error.",
        },
        data: {
          categories,
        },
      });
    })
    .catch(err => {
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
