import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blogsite", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB locally");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;