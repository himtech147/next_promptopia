import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    // console.log("Connection object:", connection);

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
