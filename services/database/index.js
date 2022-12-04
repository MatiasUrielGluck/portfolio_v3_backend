const { Sequelize } = require("sequelize");
const { database } = require("../../config");

/*
const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    {
        host: database.host,
        dialect: database.dialect,

        logging: false
    }
)
*/

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

module.exports = sequelize;
