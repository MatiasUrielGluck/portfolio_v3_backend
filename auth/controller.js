const bcrypt = require("bcrypt");
const adminUsersDao = require("./dao");
const { genJWT, checkJWT } = require("../helpers/jwt");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await adminUsersDao.getUserByUsername({ username });

    if (!user) {
      return res.status(400).json({
        status: "error",
        code: 400,
        data: "The user does not exist",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(403).json({
        status: "error",
        code: 403,
        data: "Wrong password",
      });
    }

    const token = await genJWT(user.id, user.username, user.approved);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        username: user.username,
        approved: user.approved,
        token,
      },
    });
  },

  validateToken: (req, res) => {
    const { token } = req.body;
    const result = checkJWT(token);
    if (result.status === "error") {
      return res.status(403).json({
        status: "error",
        code: 403,
        data: "Corrupt token",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  },

  register: async (req, res) => {
    const { username, password } = req.body;

    const user = await adminUsersDao.getUserByUsername({ username });

    if (user) {
      return res.status(400).json({
        status: "error",
        code: 400,
        data: "The user already exists",
      });
    }

    const salt = bcrypt.genSaltSync();
    const cryptedPassword = bcrypt.hashSync(password, salt);

    const result = await adminUsersDao.createUser({
      username: username,
      password: cryptedPassword,
    });

    res.status(200).json({
      status: "success",
      code: 200,
    });
  },
};
