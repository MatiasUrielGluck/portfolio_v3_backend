const skillDao = require("./dao");

module.exports = {
  getSkills: async (req, res) => {
    const skills = await skillDao.getSkills();
    res.status(200).json({
      status: "success",
      code: 200,
      length: skills.length,
      data: {
        skills,
      },
    });
  },

  getSkill: async (req, res) => {
    const { id } = req.params;
    const skill = await skillDao.getSkillById({ id });
    if (skill) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          skill,
        },
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Skill not found",
    });
  },

  createSkill: async (req, res) => {
    const { context, name, icon } = req.body;

    const existingSkill = await skillDao.getSkillByName({ name });
    if (existingSkill) {
      return res.status(403).json({
        status: "error",
        code: 403,
        data: "The skill already exists in the database",
      });
    }

    await skillDao.createSkill({ context, name, icon });
    res.status(200).json({
      status: "success",
      code: 200,
    });
  },

  updateSkill: async (req, res) => {
    const { id } = req.params;
    const { context, name, icon } = req.body;
    const skill = await skillDao.updateSkill({ context, name, icon }, { id });

    if (skill[0] !== 0) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: "Skill updated" });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Skill not found or not updated",
    });
  },

  deleteSkill: async (req, res) => {
    const { id } = req.params;
    const result = await skillDao.deleteSkill({ id });

    if (result !== 0) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: "Skill deleted",
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Skill not found or not deleted",
    });
  },
};
