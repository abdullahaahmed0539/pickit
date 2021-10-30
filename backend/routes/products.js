const express = require("express");
const { createNewProductForListing } = require("../api/controllers/products/createNewProductForListing");
const { fetchUnapprovedProducts } = require('../api/controllers/products/fetchUnapprovedProducts');
const { approveProduct } = require('../api/controllers/products/approveProduct');
const { fetchProduct } = require('../api/controllers/products/fetchProduct');
const checkAuth = require('../api/middleware/check-auth');
const router = express.Router();

router.route("/create_new").post(checkAuth,createNewProductForListing);
router.route("/unapproved").get(checkAuth,fetchUnapprovedProducts);
router.route("/approve").post(checkAuth,approveProduct);
router.route("/:product_id").get(checkAuth,fetchProduct);

module.exports = router;
