const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", controller.getSkills);
router.post("/", controller.createSkill);

router.get("/:id", controller.getSkill);
router.patch("/:id", controller.updateSkill)
router.delete("/:id", controller.deleteSkill);

module.exports = router;
