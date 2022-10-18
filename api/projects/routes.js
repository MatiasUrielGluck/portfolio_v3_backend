const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const checkToken = require("../../middlewares/checkToken");

router.get("/", controller.getProjects); // Public
router.post("/", [checkToken], controller.createProject); // Admin

router.get("/:id", controller.getProject); // Public
router.post("/:id", [checkToken], controller.addTag); // Admin
router.delete("/:id/:tagId", [checkToken], controller.removeTag); // Admin
router.patch("/:id", [checkToken], controller.updateProject) // Admin
router.delete("/:id", [checkToken], controller.deleteProject); // Admin

module.exports = router;
