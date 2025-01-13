const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect("mongodb://mongo:27017/blogsite");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connect;