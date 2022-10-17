const express = require("express");
const router = express.Router();

const skillsRoutes = require('../api/skills/routes.js')
const educationRoutes = require('../api/education/routes.js')

router.use('/skills', skillsRoutes)
router.use('/education', educationRoutes)
// 3. CRUD de proyectos

module.exports = router;
