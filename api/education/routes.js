const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", controller.getAllEducation);
router.post("/", controller.createEducation);

router.get("/:id", controller.getEducation);
router.patch("/:id", controller.updateEducation)
router.delete("/:id", controller.deleteEducation);

module.exports = router;
