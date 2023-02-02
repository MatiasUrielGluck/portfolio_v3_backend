const cloudinary = require("../../services/cloudinary");
const projectsDao = require("./dao");
const tagsDao = require("../tags/dao");

module.exports = {
  getProjects: async (req, res) => {
    let projects = await projectsDao.getProjects();

    projects.sort((a, b) => (a.position > b.position) ? 1 : -1);

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

  addTag: async (req, res) => {
    const { id } = req.params;
    const { tagId } = req.body;

    const project = await projectsDao.getProjectById({ id });

    if (!project) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Project not found",
      });
    }

    const tag = await tagsDao.getTagById({ id: tagId });

    if (!tag) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Tag not found",
      });
    }

    await projectsDao.addTag({ project, tag });

    res.status(200).json({
      status: "success",
      code: 200,
      data: "Tag added",
    });
  },

  removeTag: async (req, res) => {
    const { id, tagId } = req.params;

    const project = await projectsDao.getProjectById({ id });

    if (!project) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Project not found",
      });
    }

    const tag = await tagsDao.getTagById({ id: tagId });

    if (!tag) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Tag not found",
      });
    }

    const result = await projectsDao.removeTag({ project, tag });

    const historyTag = await tagsDao.getTagWithProjectById({ id: tagId });

    let autoremoved = false;

    if (historyTag.Projects.length === 0) {
      await tagsDao.deleteTag({ id: tagId });
      autoremoved = true;
    }

    let data = "";

    if (autoremoved) {
      data += "Tag autodeleted. ";
    }

    if (result === 0) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: data + "Tag was not removed because it was not added.",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: data + "Tag removed",
    });
  },

  createProject: async (req, res) => {
    // const { name, description, imageURL, demoLink, codeLink } = req.body;
    const { name, description, image, demoLink, codeLink } = req.body;

    try {
      const cloudinaryResult = await cloudinary.uploader.upload(image, {
        folder: "portfolio",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      const existingProject = await projectsDao.getProjectByName({ name });
      if (existingProject) {
        return res.status(403).json({
          status: "error",
          code: 403,
          data: "The project already exists in the database",
        });
      }

      await projectsDao.createProject({
        name,
        description,
        imageURL: cloudinaryResult.secure_url,
        demoLink,
        codeLink,
      });
      res.status(200).json({
        status: "success",
        code: 200,
      });
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        status: "error",
        code: 500,
        data: "INTERNAL ERROR CONTACT THE ADMIN",
      });
    }
  },

  updateProject: async (req, res) => {
    const { id } = req.params;
    const { name, description, image, demoLink, codeLink, position } = req.body;

    try {
      let cloudinaryResult;
      let imageURL = image;
      if (image) {
        cloudinaryResult = await cloudinary.uploader.upload(image, {
          folder: "portfolio",
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        });

        imageURL = cloudinaryResult.secure_url;
      }

      const project = await projectsDao.updateProject(
        {
          name,
          description,
          imageURL,
          demoLink,
          codeLink,
          position,
        },
        { id }
      );

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
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        status: "error",
        code: 500,
        data: "INTERNAL ERROR CONTACT THE ADMIN",
      });
    }
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
