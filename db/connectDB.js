import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Trying to COnnect to MongoDB...");
      await mongoose.connect("mongodb://127.0.0.1:27017/CrowdFund"); // Removed deprecated options
      console.log("MongoDB Connected Successfully");
    
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default connectDB;
