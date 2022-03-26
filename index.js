const express = require("express");
const app = express();
const routes = require("./router/routes");
require("dotenv").config();
const { dbConnection } = require("./database/config");

dbConnection();
app.use("/", routes);
app.listen(process.env.PORT);
console.log(`running port ${process.env.PORT}`);
