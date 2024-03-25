const express = require("express");
const router = express.Router();
const upload = require("../middlewares/mutlerMiddleware");

/** Methods */
const {
  getAllStories, createStory, getStory, searchStories, newestStories, likestStories, toggleLike
} = require("./stories.controller");

/** Middleware */
const { validateStory } = require("../middlewares/validateStory");

router.route("/").get(likestStories, newestStories, searchStories, getAllStories).post(upload.fields([{ name: "thumbnail" }, { name: "front" }, { name: "back" }]), validateStory, createStory);
router.route("/:identifier").get(getStory).patch(toggleLike);
module.exports = router;
