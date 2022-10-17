const skillModel = require("./model");

module.exports = {
  getSkills: async () => {
    return await skillModel.findAll();
  },

  getSkillById: async ({ id }) => {
    return await skillModel.findOne({
      where: {
        id: id,
      },
    });
  },

  getSkillByName: async ({ name }) => {
    return await skillModel.findOne({
      where: {
        name: name,
      },
    });
  },

  createSkill: async ({ context, name, icon }) => {
    return await skillModel.create({ context, name, icon });
  },

  updateSkill: async ({ context, name, icon }, { id }) => {
    return await skillModel.update(
      { context, name, icon },
      {
        where: { id: id },
      }
    );
  },

  deleteSkill: async ({ id }) => {
    return await skillModel.destroy({
      where: {
        id: id,
      },
    });
  },
};
