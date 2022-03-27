const express = require("express");
const { dbConnection } = require("../database/config");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/login", require("../routes/login"));
    this.app.use("/api/song", require("../routes/song"));
    this.app.use("/api/user", require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

module.exports = Server;
