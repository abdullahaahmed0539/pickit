const express = require("express");
// const {  } = require("../api/controllers/products/{filename}");
const router = express.Router();
const checkAuth = require('../api/middleware/check-auth');
const {createNewBuyerRequest} = require('../api/controllers/requests/createNewBuyerRequest');
const {fetchPendingRequests} = require('../api/controllers/requests/fetchPendingRequests');

router.route("/create_new").post(checkAuth,createNewBuyerRequest);
router.route("/pending").get(checkAuth,fetchPendingRequests);

module.exports = router;
