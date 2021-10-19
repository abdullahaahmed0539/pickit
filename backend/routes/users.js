const express = require("express");
const { signUp, login } = require("../api/controllers/users");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);

module.exports = router;
