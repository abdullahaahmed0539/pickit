const express = require("express");
const { createNewProductForListing } = require("../api/controllers/products/createNewProductForListing");
const { fetchUnapprovedProducts } = require('../api/controllers/products/fetchUnapprovedProducts');
const { approveProduct } = require('../api/controllers/products/approveProduct');
const { fetchProduct } = require('../api/controllers/products/fetchProduct');
const { updateProduct } = require("../api/controllers/products/updateProduct");
const { deleteProduct } = require("../api/controllers/products/deleteProduct");
const checkAuth = require('../api/middleware/check-auth');
const router = express.Router();

router.route("/create_new").post(checkAuth,createNewProductForListing);
router.route("/unapproved").get(checkAuth,fetchUnapprovedProducts);
router.route("/approve").post(checkAuth,approveProduct);
router.route("/:product_id").get(checkAuth,fetchProduct);
router.route("/update").post(checkAuth,updateProduct);
router.route("/:product_id").delete(checkAuth,deleteProduct);

module.exports = router;
