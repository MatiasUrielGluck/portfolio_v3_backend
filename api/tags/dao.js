const tagsModel = require("./model");

module.exports = {
  getTags: async () => {
    return await tagsModel.findAll();
  },

  getTagById: async ({ id }) => {
    return await tagsModel.findOne({
      where: {
        id: id,
      },
    });
  },

  getTagByName: async ({ name }) => {
    return await tagsModel.findOne({
      where: {
        name: name,
      },
    });
  },

  createTag: async ({ name }) => {
    return await tagsModel.create({ name });
  },

  updateTag: async ({ name }, { id }) => {
    return await tagsModel.update(
      { name },
      {
        where: { id: id },
      }
    );
  },

  deleteTag: async ({ id }) => {
    return await tagsModel.destroy({
      where: {
        id: id,
      },
    });
  },
};
