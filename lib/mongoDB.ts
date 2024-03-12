import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true)

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "JS_Ecommerce_Admin",
    })

    isConnected = true
    console.log("MongoDB connected")
  } catch(err){
    console.log(err)
  }
};