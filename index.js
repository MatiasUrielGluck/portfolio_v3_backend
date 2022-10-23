// Express
const express = require("express");
const app = express();

// CORS
var cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONTEND_ORIGIN,
//   })
// );

app.use(cors(corsOptions));

// ENV
require("dotenv").config();

// Database
const sequelize = require("./services/database");

// Routes
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const utilsRouter = require("./routes/utils");

// Models
const associateModels = require("./api/associations");

// Other Middlewares
app.use(express.json({ limit: "50MB" }));

associateModels();

app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/utils", utilsRouter);

//
app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}...`);

  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
