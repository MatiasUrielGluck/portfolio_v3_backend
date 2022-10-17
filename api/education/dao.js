const educationModel = require("./model");

module.exports = {
  getAllEducation: async () => {
    return await educationModel.findAll();
  },

  getEducationById: async ({ id }) => {
    return await educationModel.findOne({
      where: {
        id: id,
      },
    });
  },

  getEducationByTitle: async ({ title }) => {
    return await educationModel.findOne({
      where: {
        title: title,
      },
    });
  },

  createEducation: async ({ title, subtitle }) => {
    return await educationModel.create({ title, subtitle });
  },

  updateEducation: async ({ title, subtitle }, { id }) => {
    return await educationModel.update(
      { title, subtitle },
      {
        where: { id: id },
      }
    );
  },

  deleteEducation: async ({ id }) => {
    return await educationModel.destroy({
      where: {
        id: id,
      },
    });
  },
};
