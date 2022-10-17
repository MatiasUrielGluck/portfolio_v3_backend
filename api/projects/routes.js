const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", controller.getProjects);
router.post("/", controller.createProject);

router.get("/:id", controller.getProject);
router.patch("/:id", controller.updateProject)
router.delete("/:id", controller.deleteProject);

module.exports = router;
