import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    isConnected = true;
    console.log("connection object", connection);
    console.log("Mongodb connection is established");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
};
