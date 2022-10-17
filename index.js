const express = require("express");
const app = express();

const sequelize = require("./services/database");
const router = require("./routes");

const associateModels = require('./api/associations')

const port = 3000;

app.use(express.json())

associateModels()

app.use("/api", router);

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);

  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
