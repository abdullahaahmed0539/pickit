const express = require("express");
const { displayCategories } = require("../api/controllers/categories/displayCategories");
const { displayCategory } = require("../api/controllers/categories/displayCategory");
const router = express.Router();

router.route("/").get(displayCategories);
router.route("/:category_id").get(displayCategory);

module.exports = router;
