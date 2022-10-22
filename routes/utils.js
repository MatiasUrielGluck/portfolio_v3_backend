const express = require("express");
const router = express.Router();
const controller = require("../utils/controller");

router.get("/downloads/:fileName", controller.download);

module.exports = router;
