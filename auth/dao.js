const AdminUser = require("./model");

module.exports = {
  getUserByUsername: async ({ username }) => {
    return await AdminUser.findOne({
      where: {
        username: username,
      },
    });
  },

  getUserById: async ({ id }) => {},

  createUser: async ({ username, password }) => {
    return await AdminUser.create({
      username,
      password,
      approved: false,
    });
  },
};
