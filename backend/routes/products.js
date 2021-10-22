const express = require("express");
const { createNewProductForListing } = require("../api/controllers/products/createNewProductForListing");
const checkAuth = require('../api/middleware/check-auth');
const router = express.Router();

router.route("/create_new").post(checkAuth,createNewProductForListing);

module.exports = router;
