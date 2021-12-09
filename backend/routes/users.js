const express = require("express");
const { signUp } = require("../api/controllers/users/signup");
const { login } = require("../api/controllers/users/login");
const { updateProfile } = require("../api/controllers/users/updateProfile");
const { clearCart } = require("../api/controllers/users/clearCart");
const { myProducts } = require("../api/controllers/users/myProducts");
const checkAuth = require('../api/middleware/check-auth');
const { getUserDetails } = require("../api/controllers/users/getUserDetails");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/clear_cart").post(checkAuth,clearCart);
router.route("/get_user_details/:username").get(checkAuth,getUserDetails);
router.route("/update_profile").post(checkAuth,updateProfile);
router.route("/:userid/get_products").get(checkAuth, myProducts);


module.exports = router;
