const express = require("express");
const app = express();
const router = require("./router/router");
require("dotenv").config();
const { dbConnection } = require("./database/config");

dbConnection();
app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT);
console.log(`running port ${process.env.PORT}`);
