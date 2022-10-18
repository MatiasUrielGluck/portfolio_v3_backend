const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const checkToken = require("../../middlewares/checkToken");

router.get("/", controller.getTags); // Public
router.post("/", [checkToken], controller.createTag); // Admin

router.get("/:id", controller.getTag); // Pubic
router.patch("/:id", [checkToken], controller.updateTag) // Admin
router.delete("/:id", [checkToken], controller.deleteTag); // Admin

module.exports = router;
