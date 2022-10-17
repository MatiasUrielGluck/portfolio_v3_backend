const projectsModel = require("./model");

module.exports = {
  getProjects: async () => {
    return await projectsModel.findAll();
  },

  getProjectById: async ({ id }) => {
    return await projectsModel.findOne({
      where: {
        id: id,
      },
    });
  },

  getProjectByName: async ({ name }) => {
    return await projectsModel.findOne({
      where: {
        name: name,
      },
    });
  },

  createProject: async ({ name, description, imageURL, demoLink, codeLink }) => {
    return await projectsModel.create({ name, description, imageURL, demoLink, codeLink });
  },

  updateProject: async ({ name, description, imageURL, demoLink, codeLink }, { id }) => {
    return await projectsModel.update(
      { name, description, imageURL, demoLink, codeLink },
      {
        where: { id: id },
      }
    );
  },

  deleteProject: async ({ id }) => {
    return await projectsModel.destroy({
      where: {
        id: id,
      },
    });
  },
};
