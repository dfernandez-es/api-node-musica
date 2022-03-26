const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("BBDD online");
  } catch (error) {
    console.log(error);
    throw new Error("Error to connect BBDD");
  }
};

module.exports = {
  dbConnection,
};
