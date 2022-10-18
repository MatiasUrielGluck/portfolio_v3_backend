const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const checkToken = require("../../middlewares/checkToken");

router.get("/", controller.getSkills); // Public
router.post("/", [checkToken], controller.createSkill); // Admin

router.get("/:id", controller.getSkill); // Public
router.patch("/:id", [checkToken], controller.updateSkill) // Admin
router.delete("/:id", [checkToken], controller.deleteSkill); // Admin

module.exports = router;
