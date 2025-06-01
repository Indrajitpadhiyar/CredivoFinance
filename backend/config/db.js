const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL , {});
    console.log("MongoDB connected successfully...");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDb;
// This code connects to a MongoDB database using Mongoose.
