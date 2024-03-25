const express = require("express");
const upload = require("../middlewares/mutlerMiddleware");

const {
  getAllCategories, createCategory, getCategory,
} = require("./categories.controller");
const { validateCategory } = require("../middlewares/validateCategory");

const router = express.Router();

router.route("/").get(getAllCategories).post(upload.single("image"), validateCategory, createCategory);
router.route("/:identifier").get(getCategory);
module.exports = router;
