const tagsModel = require('./tags/model')
const projectsModel = require('./projects/model')

const associateModels = () => {
    tagsModel.belongsToMany(projectsModel, {through: "Project_Tag", timestamps: false})
    projectsModel.belongsToMany(tagsModel, {through: "Project_Tag", timestamps: false})
};

module.exports = associateModels;
