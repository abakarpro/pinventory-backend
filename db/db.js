const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is ready...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDatabase;
