const projectsDao = require("./dao");

module.exports = {
  getProjects: async (req, res) => {
    const projects = await projectsDao.getProjects();
    res.status(200).json({
      status: "success",
      code: 200,
      length: projects.length,
      data: {
        projects,
      },
    });
  },

  getProject: async (req, res) => {
    const { id } = req.params;
    const project = await projectsDao.getProjectById({ id });
    if (project) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          project,
        },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Project not found",
    });
  },

  createProject: async (req, res) => {
    const { name, description, imageURL, demoLink, codeLink } = req.body;

    const existingProject = await projectsDao.getProjectByName({ name });
    if (existingProject) {
      return res.status(403).json({
        status: "error",
        code: 403,
        data: "The project already exists in the database",
      });
    }

    await projectsDao.createProject({ name, description, imageURL, demoLink, codeLink });
    res.status(200).json({
      status: "success",
      code: 200,
    });
  },

  updateProject: async (req, res) => {
    const { id } = req.params;
    const { name, description, imageURL, demoLink, codeLink } = req.body;
    const project = await projectsDao.updateProject({ name, description, imageURL, demoLink, codeLink }, { id });

    if (project[0] !== 0) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: "Project updated" });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Project not found or not updated",
    });
  },

  deleteProject: async (req, res) => {
    const { id } = req.params;
    const result = await projectsDao.deleteProject({ id });

    if (result !== 0) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: "Project deleted",
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Project not found or not deleted",
    });
  },
};
