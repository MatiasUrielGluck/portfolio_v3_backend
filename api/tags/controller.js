const tagsDao = require("./dao");

module.exports = {
  getTags: async (req, res) => {
    const tags = await tagsDao.getTags();
    res.status(200).json({
      status: "success",
      code: 200,
      length: tags.length,
      data: {
        tags,
      },
    });
  },

  getTag: async (req, res) => {
    const { id } = req.params;
    const tag = await tagsDao.getTagById({ id });
    if (tag) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          tag,
        },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Tag not found",
    });
  },

  createTag: async (req, res) => {
    const { name } = req.body;

    const existingTag = await tagsDao.getTagByName({ name });
    if (existingTag) {
      return res.status(403).json({
        status: "error",
        code: 403,
        data: "The tag already exists in the database",
      });
    }

    await tagsDao.createTag({ name });
    res.status(200).json({
      status: "success",
      code: 200,
    });
  },

  updateTag: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await tagsDao.updateTag({ name }, { id });

    if (tag[0] !== 0) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: "Tag updated" });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Tag not found or not updated",
    });
  },

  deleteTag: async (req, res) => {
    const { id } = req.params;
    const result = await tagsDao.deleteTag({ id });

    if (result !== 0) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: "Tag deleted",
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Tag not found or not deleted",
    });
  },
};
