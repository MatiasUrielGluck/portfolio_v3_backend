const express = require("express");
const router = express.Router();
const controller = require("../auth/controller");

router.post("/login", controller.login);
router.post("/validatetoken", controller.validateToken);
router.post("/register", controller.register);

module.exports = router;
