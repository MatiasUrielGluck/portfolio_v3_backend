const { DataTypes } = require("sequelize");
const sequelize = require("../../services/database");

const Tag = sequelize.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Tag;
