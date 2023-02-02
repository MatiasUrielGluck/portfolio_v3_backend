const projectsModel = require("./model");
const Tag = require("../tags/model");

module.exports = {
  getProjects: async () => {
    return await projectsModel.findAll({
      include: {
        model: Tag,
        nested: true,
      },
    });
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

  addTag: async ({ project, tag }) => {
    return await project.addTag(tag);
  },

  removeTag: async ({ project, tag }) => {
    return await project.removeTag(tag);
  },

  createProject: async ({
    name,
    description,
    imageURL,
    demoLink,
    codeLink,
  }) => {
    return await projectsModel.create({
      name,
      description,
      imageURL,
      demoLink,
      codeLink,
      position: projectsModel.length + 1,
    });
  },

  updateProject: async (
    { name, description, imageURL, demoLink, codeLink, position },
    { id }
  ) => {
    return await projectsModel.update(
      { name, description, imageURL, demoLink, codeLink, position },
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
