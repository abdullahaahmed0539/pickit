const express = require("express");
const { createOrder } = require('../api/controllers/orders/createOrder')
const { myOrders } = require("../api/controllers/orders/myOrders");
const { getOrder } = require("../api/controllers/orders/getOrder");
const { fulfillOrder } = require("../api/controllers/orders/fulfill");
const { getAllOrders } = require("../api/controllers/orders/getAllOrders");
const checkAuth = require("../api/middleware/check-auth");
const router = express.Router();

router.route("/create_order").post(checkAuth, createOrder);
router.route("/my_orders/:username").get(checkAuth, myOrders);
router.route("/fullfil").post(checkAuth, fulfillOrder);
router.route("/get_all_orders").get(checkAuth, getAllOrders);
router.route("/:order_id").get(checkAuth, getOrder);


module.exports = router;
