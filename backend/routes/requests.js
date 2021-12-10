const express = require("express");
const router = express.Router();
const checkAuth = require('../api/middleware/check-auth');
const {createNewBuyerRequest} = require('../api/controllers/requests/createNewBuyerRequest');
const {fetchPendingRequests} = require('../api/controllers/requests/fetchPendingRequests');
const { fetchProductRequests } = require('../api/controllers/requests/fetchProductRequests');
const {removeRequest} = require('../api/controllers/requests/removeRequest')
const {performAction} = require('../api/controllers/requests/performAction');

router.route("/create_new").post(checkAuth,createNewBuyerRequest);
router.route("/pending").get(checkAuth,fetchPendingRequests);
router.route("/:product_id").get(checkAuth,fetchProductRequests);
router.route("/:request_id").post(checkAuth, performAction);
router.route('/remove/:request_id').get(checkAuth, removeRequest);

module.exports = router;
