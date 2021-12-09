const express = require("express");
const { createOrder } = require('../api/controllers/orders/createOrder')
const checkAuth = require("../api/middleware/check-auth");
const router = express.Router();

router.route("/create_order").post(checkAuth,createOrder);


module.exports = router;
