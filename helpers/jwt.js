const jwt = require("jsonwebtoken");

const genJWT = (uid, username, approved) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid: uid,
      username: username,
      approved: approved,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Failed to generate token");
        }

        resolve(token);
      }
    );
  });
};

const checkJWT = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_SEED);
    return {
      status: "success",
      data: decoded,
    };
  } catch (err) {
    return {
      status: "error",
    };
  }
};

module.exports = { genJWT, checkJWT };
