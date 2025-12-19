import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "producter-dashboard"
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    throw error;
  }
};

export default connectDB;
