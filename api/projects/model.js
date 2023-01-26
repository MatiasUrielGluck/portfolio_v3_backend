const { DataTypes } = require("sequelize");
const sequelize = require("../../services/database");

const Project = sequelize.define(
  "Project",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    imageURL: {
      type: DataTypes.TEXT("medium"),
    },

    demoLink: {
      type: DataTypes.STRING,
    },

    codeLink: {
      type: DataTypes.STRING,
    },

    position: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Project;
