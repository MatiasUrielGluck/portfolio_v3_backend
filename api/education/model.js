const { DataTypes } = require("sequelize");
const sequelize = require("../../services/database");

const Education = sequelize.define(
  "Education",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Education;
