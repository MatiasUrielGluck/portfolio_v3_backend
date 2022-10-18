const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const AdminUser = sequelize.define(
  "AdminUser",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    approved: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = AdminUser;
