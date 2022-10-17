const { DataTypes } = require("sequelize");
const sequelize = require("../../services/database");

const Skill = sequelize.define(
  "Skill",
  {
    context: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    icon: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Skill;
