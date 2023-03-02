const mongoose = require("mongoose");
const params = require("../params");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(params.MONGO_URI);
    console.log(`Database connected! ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Connection failed!");
  }
};

module.exports = connectDB;
