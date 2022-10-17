const educationDao = require("./dao");

module.exports = {
  getAllEducation: async (req, res) => {
    const education = await educationDao.getAllEducation();
    res.status(200).json({
      status: "success",
      code: 200,
      length: education.length,
      data: {
        education,
      },
    });
  },

  getEducation: async (req, res) => {
    const { id } = req.params;
    const education = await educationDao.getEducationById({ id });
    if (education) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          education,
        },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Education not found",
    });
  },

  createEducation: async (req, res) => {
    const { title, subtitle } = req.body;

    const existingEducation = await educationDao.getEducationByTitle({ title });
    if (existingEducation) {
      return res.status(403).json({
        status: "error",
        code: 403,
        data: "The education already exists in the database",
      });
    }

    await educationDao.createEducation({ title, subtitle });
    res.status(200).json({
      status: "success",
      code: 200,
    });
  },

  updateEducation: async (req, res) => {
    const { id } = req.params;
    const { title, subtitle } = req.body;
    const education = await educationDao.updateEducation({ title, subtitle }, { id });

    if (education[0] !== 0) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: "Education updated" });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Education not found or not updated",
    });
  },

  deleteEducation: async (req, res) => {
    const { id } = req.params;
    const result = await educationDao.deleteEducation({ id });

    if (result !== 0) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: "Education deleted",
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Education not found or not deleted",
    });
  },
};
