const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const checkToken = require("../../middlewares/checkToken");

router.get("/", controller.getAllEducation); // Public
router.post("/", [checkToken], controller.createEducation); // Admin

router.get("/:id", controller.getEducation); // Public
router.patch("/:id", [checkToken], controller.updateEducation); // Admin
router.delete("/:id", [checkToken], controller.deleteEducation); // Admin

module.exports = router;
