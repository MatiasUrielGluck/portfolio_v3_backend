// Express
const express = require("express");
const app = express();

// CORS
var cors = require('cors')
app.use(cors())

// ENV
require('dotenv').config()

// Database
const sequelize = require("./services/database");

// Routes
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

const associateModels = require('./api/associations')

const port = process.env.PORT;

// Other Middlewares
app.use(express.json())

associateModels()

app.use("/api", apiRouter);
app.use("/auth", authRouter);

// 
app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);

  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
