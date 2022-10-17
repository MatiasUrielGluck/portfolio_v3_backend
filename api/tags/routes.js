const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", controller.getTags);
router.post("/", controller.createTag);

router.get("/:id", controller.getTag);
router.patch("/:id", controller.updateTag)
router.delete("/:id", controller.deleteTag);

module.exports = router;
