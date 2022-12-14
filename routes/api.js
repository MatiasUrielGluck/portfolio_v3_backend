const express = require("express");
const router = express.Router();

const skillsRoutes = require('../api/skills/routes.js')
const educationRoutes = require('../api/education/routes.js')
const projectsRoutes = require('../api/projects/routes.js')
const tagsRoutes = require('../api/tags/routes.js')

router.use('/skills', skillsRoutes)
router.use('/education', educationRoutes)
router.use('/projects', projectsRoutes)
router.use('/tags', tagsRoutes)

module.exports = router;
